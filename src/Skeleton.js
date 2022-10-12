import HomeSkeleton from './components/skeleton/homeSkeleton'
import { createApp } from 'vue'

export default createApp({
    components: {
        HomeSkeleton,
    },
    template: '<HomeSkeleton id="homeView"></HomeSkeleton>'
})