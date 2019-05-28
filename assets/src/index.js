import main from './main.vue';
import vue from 'vue';

new vue({
    el: '#app',
    render: function(createElement){
        return createElement(main);
    }
})
