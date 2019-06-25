<template>
  <blog-detail :is-edit="true" />
</template>

<script>
  import BlogDetail from './components/BlogDetail'

  export default {
    name: 'EditForm',
    components: { BlogDetail }
  }
</script>
