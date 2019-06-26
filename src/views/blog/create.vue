<template>
  <div class="app-container">
    <blog-detail :is-edit="false" />
  </div>
</template>

<script>
  import BlogDetail from './components/BlogDetail'

  export default {
    name: 'CreateForm',
    components: { BlogDetail }
  }
</script>
