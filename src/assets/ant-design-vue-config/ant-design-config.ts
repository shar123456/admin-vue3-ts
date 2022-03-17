import {InputSearch,Breadcrumb,Modal,Select,Tag,Pagination,Button,Form,Input,FormItem,Layout, Menu,Row,Col,Spin,Avatar,Dropdown,MenuItem,Table,Popconfirm} from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
const components=[InputSearch,Breadcrumb,Modal,Select,Tag,Button,Form,Input,FormItem,Layout,Menu,Row,Col,Spin,Avatar,Dropdown,MenuItem,Table,Popconfirm,Pagination];


const setUpAntd=(app:any):void => {
    components.forEach((element)=>{
        app.use(element);
    });
};
export {setUpAntd};