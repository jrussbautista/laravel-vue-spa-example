<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <router-link class="navbar-brand"  active-class="active" :to="{ name: 'posts'}">Home</router-link>

            <div class="d-flex">
                <router-link class="nav-link" active-class="active" :to="{ name: 'posts.create'}">Create Post</router-link>
            </div>
        </div>
    </nav>
</template>

<script>
export  default  {
    name: 'Header'
}
</script>
