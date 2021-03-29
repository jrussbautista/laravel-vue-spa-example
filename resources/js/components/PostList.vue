<template>
    <div>
        <select class="form-control" v-model="selectedCategoryId">
            <option value="">Please choose a category</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.name }}
            </option>
        </select>
        <table class="table">
            <thead>
            <tr>
                <th scope="col">
                    <a href="#" @click.prevent="changeSort('title')">Title</a>
                    <span v-if="showSortIcon('title', 'asc')">&uarr;</span>
                    <span v-if="showSortIcon('title', 'desc')">&darr;</span>
                </th>
                <th scope="col">
                    <a href="#" @click.prevent="changeSort('body')">Body</a>
                    <span v-if="showSortIcon('body', 'asc')">&uarr;</span>
                    <span v-if="showSortIcon('body', 'desc')">&darr;</span>
                </th>
                <th scope="col">
                    <a href="#" @click.prevent="changeSort('created_at')">Created At</a>
                    <span v-if="showSortIcon('created_at', 'asc')">&uarr;</span>
                    <span  v-if="showSortIcon('created_at', 'desc')">&darr;</span>
                </th>
                <th>
                    Action
                </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="post in posts.data" :key="post.id">
                <td>{{ post.title }}</td>
                <td>{{ post.body.substring(0, 50) }}</td>
                <td>{{ post.created_at }}</td>
                <td>
                    <router-link class="btn btn-primary mb-2" :to="{ name: 'posts.edit', params: { id: post.id }}"> Edit</router-link>
                    <button class="btn btn-danger mb-2" @click="deletePost(post.id)"> Delete </button>
                </td>
            </tr>
            </tbody>
        </table>

        <div class="text-center d-flex align-items-center justify-content-center mt-5">
            <pagination :data="posts" @pagination-change-page="getPosts" :limit="3"></pagination>
        </div>
    </div>
</template>

<script>


 export  default  {
     name: 'PostList',
     data() {
         return {
             categories: [],
             posts: {},
             selectedCategoryId: "",
             sortField: "created_at",
             sortDirection: "desc"
         }
     },
     mounted() {
         this.getCategories();
         this.getPosts();
     },
     watch: {
         selectedCategoryId (value) {
            this.getPosts();
        }
     },
     methods: {
         getPosts(page = 1) {
             axios.get('/api/posts?page=' + page
                 + "&category_id=" + this.selectedCategoryId
                 + "&sort_field=" + this.sortField
                 + "&sort_direction=" + this.sortDirection
             )
                 .then(res => {
                 this.posts = res.data;
             })
         },
         getCategories() {
             axios.get('/api/categories').then(res => {
                 this.categories = res.data.data;
             })
         },
         changeSort(field) {
             this.sortField = field;
             if(this.sortField === field) {
                 this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
             }
             this.getPosts();
         },
         showSortIcon(field, direction){
             return this.sortField === field && this.sortDirection === direction;
         },
         deletePost(postId) {

                 this.$swal.fire({
                     title: 'Do you want to delete this post?',
                     showDenyButton: true,
                     showCancelButton: false,
                     confirmButtonText: `Yes`,
                     denyButtonText: `No`,
                 }).then((result) => {
                     /* Read more about isConfirmed, isDenied below */
                     if (result.isConfirmed) {
                         axios.delete('/api/posts/' + postId).then(res => {
                             this.posts = {...this.posts, data: this.posts.data.filter(post => post.id !== postId) };
                             this.$swal('Good job!', 'Post deleted successfully!', 'success');
                         }).catch(err => {
                             this.$swal('Error!', 'Unable to delete post  right now.', 'error');
                         })
                     }
                 });

         }
     }
 }
</script>
