import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import AddContact from '@/components/AddContact'
import AddContactInfo from '@/components/AddContactInfo'
import AddContactNote from '@/components/AddContactNote'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/add-contact',
      name: 'AddContact',
      component: AddContact
    },
    {
      path: '/add-contact-info',
      name: 'AddContactInfo',
      component: AddContactInfo
    },
    {
      path: '/add-contact-note',
      name: 'AddContactNote',
      component: AddContactNote
    }
  ]
})
