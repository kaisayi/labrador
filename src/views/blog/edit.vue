<template>
  <div class="app-container">
    <blog-detail :is-edit="true" />
  </div>
</template>

<script>
  import BlogDetail from './components/BlogDetail'

  export default {
    name: 'EditForm',
    components: { BlogDetail }
  }
</script>
