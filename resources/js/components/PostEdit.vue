<template>
    <div>
        <h1>  Post Edit </h1>
        <form @submit.prevent="updatePost">
            <div class="mb-3">
                <label for="title" class="form-label">Title</label>
                <input type="text" class="form-control" id="title" v-model="fields.title" >
                <div class="alert alert-danger mt-2" v-if="errors && errors.title">
                    {{ errors.title[0] }}
                </div>
            </div>
            <div class="mb-3">
                <label for="body" class="form-label">Description</label>
                <textarea class="form-control" id="body" v-model="fields.body" name="body" rows="3"></textarea>
                <div class="alert alert-danger mt-2" v-if="errors && errors.body">
                    {{ errors.body[0] }}
                </div>
            </div>
            <div class="mb-3">
                <label for="category"> Category </label>
                <select name="category" id="category" class="form-control" v-model="fields.category_id">
                    <option v-for="category in  categories" :value="category.id">
                        {{ category.name }}
                    </option>
                </select>
                <div class="alert alert-danger mt-2" v-if="errors && errors.category_id">
                    {{ errors.category_id[0] }}
                </div>
            </div>

            <div class="mb-3">
                <button class="btn btn-primary" :disabled="isSubmitting" type="submit">
                    {{ isSubmitting ? "Submitting..." : "Submit" }}
                </button>
            </div>
        </form>
    </div>
</template>


<script>
export  default  {
    data() {
      return {
          fields: {
              title: '',
              post_text: '',
              category_id: '',
              thumbnail: null
          },
          errors: {},
          categories: [],
          isSubmitting: false
      }
    },
    mounted() {
        this.getCategories();
        this.getPost();
    },
    methods: {
        getCategories(){
            axios.get('/api/categories')
                .then(res => {
                    this.categories = res.data.data;
                });
        },
        getPost() {
            axios.get('/api/posts/' + this.$route.params.id).then(res => {
               const fields = {
                   title: res.data.data.title,
                   body: res.data.data.body,
                   category_id: res.data.data.category.id,
                   thumbnail: res.data.data.thumbnail
               };

                this.fields = fields;
            })
        },
        updatePost() {
            this.isSubmitting = true;
            axios.put('/api/posts/' + this.$route.params.id, this.fields).then(res => {
                this.$swal('Good job!', 'Post updated successfully!', 'success');
                this.isSubmitting = false;
                this.$router.push('/');
            }).catch(err => {
                if(err.response.status === 422) {
                    this.errors = err.response.data.errors;
                }
                this.isSubmitting = false;
            })
        }
    }
}
</script>
