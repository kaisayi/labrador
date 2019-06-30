<template>
  <scroll-bar>
    <el-menu mode="vertical" unique-opened :default-active="$route.path" :collapse="isCollapse"
             background-color="#304156" text-color="#fff" active-text-color="#409EFF">
      <sidebar-item :routes="routes"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
  import { mapGetters, mapState, mapMutations } from 'vuex'
  import SidebarItem from './SidebarItem'
  import ScrollBar from '@/components/ScrollBar'

  export default {
    components: { SidebarItem, ScrollBar },
    computed: {
      ...mapState(['settings']),
      ...mapGetters([
        'sidebar'
      ]),
      routes() {
        return this.$router.options.routes
      },
      isCollapse() {
        return !this.sidebar.opened
      }
    },
    methods: {
      ...mapMutations(['addVisitedViews']),
      initialize() {
        const { fullPath, name } = this.$route
        this.addVisitedViews({ fullPath, name })
      }
    },
    watch: {
      '$route': {
        handler: 'initialize',
        immediate: true
      }
    }

  }
</script>
