<template>
    <div>
        <h1>  Post Create</h1>
        <form @submit.prevent="createPost">
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
                <select name="category" id="" class="form-control" v-model="fields.category_id">
                    <option v-for="category in  categories" :value="category.id">
                        {{ category.name }}
                    </option>
                </select>
                <div class="alert alert-danger mt-2" v-if="errors && errors.category_id">
                    {{ errors.category_id[0] }}
                </div>
            </div>
            <div class="mb-3">
                <input type="file"  @change="selectFile" >
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


export default {
    name: 'PostCreate',
    data() {
        return  {
            categories: [],
            isSubmitting: false,
            errors: {},
            fields: {
                title: "",
                body: "",
                category_id: "",
                thumbnail: null
            }
        }
    },
    mounted() {
     this.getCategories();
    },
    methods: {
        selectFile(event) {
            this.fields.thumbnail = event.target.files[0];
        },
        getCategories() {
            axios.get('/api/categories').then(res => {
                this.categories = res.data.data;
            }).catch(err => {
                console.log(err)
            })
        },
        createPost() {
            this.isSubmitting = true;

            const fields = new FormData();
            for (const field in this.fields) {
                fields.append(field, this.fields[field]);
            }

            axios.post('/api/posts', fields).then(res => {
                this.$swal('Good job!', 'Post created successfully!', 'success');
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
