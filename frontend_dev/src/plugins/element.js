import Vue from 'vue'
import {
    Button,
    Card,
    Form,
    FormItem,
    Input,
    Select,
    Option,
    Divider,
    Container,
    Aside,
    Main,
    Avatar,
    Header,
    Message,
    MessageBox
} from 'element-ui'

Vue.use(Button)
Vue.use(Card)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Divider)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Avatar)
Vue.use(Header)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox 