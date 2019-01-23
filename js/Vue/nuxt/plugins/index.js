import Vue from 'vue'

import elementUI, { Button } from 'element-ui';


Object.assign(Vue.prototype, {
	$_axios: () => import('axios'),
	$_md5: () => import('./md5')
})



Vue.component(Button.name, Button); 

Vue.filter('RMB', val => '$' + val)
