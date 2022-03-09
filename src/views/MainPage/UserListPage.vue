<template>
  <UserListQueryHeader
    @SearchBtn="SearchBtn"
    @showCreateModal="showCreateModal"
    :UserData="UserDataEntityState"
  ></UserListQueryHeader>

  

  <div id="userList">
    <a-table bordered    :rowClassName="(record, index) => (index % 2 === 1 ? 'table-striped' : null)"
     
      id="yy"
      :columns="UserListColumns"
      :data-source="UserDataList"
      :scroll="{ x: 1000, y: 'calc(100vh - 310px)' }" 
      :customRow="rowActionClick"
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
      }"
      :pagination="false"
    >
      <template #action>
        <a
          style="
            color: rgba(18, 96, 214, 0.733);
            font-size: 16px;
            font-weight: 800;
          "
          ><edit-two-tone /></a
        >

        <a-popconfirm
          placement="leftTop"
          title="确要删除此项？"
          ok-text="Yes"
          cancel-text="No"
          @confirm="confirm"
          @cancel="cancel"
        >
          <a
            style="
              color: rgba(255, 81, 0, 0.733);
              font-size: 16px;
              font-weight: 800;
              margin-left: 9px;
            "
            href="#"
            ><delete-two-tone /></a
          >
        </a-popconfirm>

       
      </template>

      <template #IsUse="{ text: IsUse }">
        <span>
          <a-tag :color="IsUse === '启用' ? 'blue' : 'red'">
            {{ IsUse }}
          </a-tag>
        </span>
      </template>

      <!-- <template #expandedRowRender="{ record }">
      <p style="margin: 0">
        {{ record.desc }}
      </p>
    </template> -->
    </a-table>

    <div class="userPagination">
      <a-pagination
        show-size-changer
        v-model:current="current1"
        v-model:pageSize="pageSize"
        :total="totalCount"
        @showSizeChange="onShowSizeChange"
      />
    </div>
  </div>

  <UserListModal
    :visiblea="visible"
    :modalTitlea="modalTitle"
    :UserData="UserDataEntityState"
    @closeMoadl="closeMoadl"
  />
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, ref, watch } from "vue";
import { GetUserColumn, GetUserDatas } from "../../Request/userRequest";
import { message } from "ant-design-vue";
import UserListQueryHeader from "../../components/UserListQueryHeader.vue";
import UserListModal from "../../components/UserListModal.vue";
import { EditTwoTone,DeleteTwoTone } from "@ant-design/icons-vue";
// import FileSaver from "file-saver";
/*eslint-disabled*/
// import * as XLSX from "xlsx";
import { UserDataEntity, IUserInfo } from "../../TypeInterface/userInterface";

export default defineComponent({
  components: {
    // SearchOutlined,
    UserListQueryHeader,
    UserListModal,EditTwoTone,DeleteTwoTone
  },
  setup() {
    const UserDataEntityState = reactive(new UserDataEntity());

    let visible = ref<boolean>(false);
    let modalTitle = ref<string>("");
    const deleteMark = ref<string>("");

    /***功能按钮****************/
    const SearchBtn = async (payload: any) => {
      console.log(payload);
      let UserDatasList1 = await GetUserDatas({
        current: 1,
        pageSize: pageSize.value,
        ...payload,
      });
      // console.log(UserDatasList1)
      if (UserDatasList1.success) {
        UserDataEntityState.UserDataList = UserDatasList1.data;
        totalCount.value = UserDatasList1.total;
        current1.value = 1;
      }
    };

    const showCreateModal = () => {
      visible.value = true;
      modalTitle.value = "新增【用户列表】";
      UserDataEntityState.EditData.Id = "";
      UserDataEntityState.EditData.Name = "";

      UserDataEntityState.EditData.password = "";
      UserDataEntityState.EditData.sex = "未选择";
      UserDataEntityState.EditData.IsUse = "未选择";
      UserDataEntityState.EditData.address = "";
      UserDataEntityState.EditData.phone = "";

      UserDataEntityState.EditData.email = "";
      UserDataEntityState.EditData.level = "";
      UserDataEntityState.EditData.desc = "";
      console.log("showCreateModal", visible.value);
    };

    const closeMoadl = () => {
      visible.value = false;
    };


    /***功能按钮****************/

    const confirm = (e: MouseEvent) => {
      console.log(e);

      const index = UserDataEntityState.UserDataList.findIndex(
        (i: IUserInfo) => i.Id == deleteMark.value
      );

      UserDataEntityState.UserDataList.splice(index, 1);
      deleteMark.value = "";

      message.success("删除成功.");
    };

    const cancel = (e: MouseEvent) => {
      console.log(e);
      deleteMark.value = "";
      message.error("已取消操作.");
    };

    /***分页****************/
    const pageSize = ref(10);
    const current1 = ref(1);
    const totalCount = ref(0);

    const onShowSizeChange = (current: number, pageSize: number) => {
      GetUserDatas({
        current: current,
        pageSize: pageSize,
        ...UserDataEntityState.QueryConditionInfo,
      }).then((res: any) => {
        console.log(res);
        if (res.success) {
          UserDataEntityState.UserDataList = res.data;
        }
      });
    };
    watch(pageSize, () => {
      console.log("pageSize", pageSize.value);
    });
    watch(current1, () => {
      GetUserDatas({
        current: current1.value,
        pageSize: pageSize.value,
        ...UserDataEntityState.QueryConditionInfo,
      }).then((res: any) => {
        console.log(res);
        if (res.success) {
          UserDataEntityState.UserDataList = res.data;
        }
      });
    });
    /***分页****************/

    /***数据初始化****************/
    onMounted(async () => {
      let columnList = await GetUserColumn();
      if (columnList.success) {
        UserDataEntityState.UserListColumns = columnList.columns;
      }
      // console.log(UserDataEntityState.UserListColumns);

      let UserDatasList = await GetUserDatas({
        current: 1,
        pageSize: pageSize.value,
      });
      if (UserDatasList.success) {
        UserDataEntityState.UserDataList = UserDatasList.data;
        totalCount.value = UserDatasList.total;
      }
    });
    /***数据初始化****************/

    /***排序****************/
    const handleTableChange = (pag: any, filters: any, sorter: any) => {
      console.log({
        results: pag!.pageSize!,
        page: pag?.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters,
      });
    };
    /***排序****************/
    /***勾选****************/
    const onSelectChange = (selectedRowKeys: []) => {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      UserDataEntityState.selectedRowKeys = selectedRowKeys;
    };
    /***勾选****************/

    /***rowActionClick****************/
    const rowActionClick = (record: any) => {
      return {
        onClick: (event: any) => {
          if (event.target.innerText == "编辑") {
            console.log(event);
            console.log(record);
            const Id = record.Id;
            const res: IUserInfo[] = UserDataEntityState.UserDataList.filter(
              (i: IUserInfo) => i.Id == Id
            );
            //console.log(res[0].Id);
            UserDataEntityState.EditData.Id = res[0].Id;
            UserDataEntityState.EditData.Name = res[0].Name;

            UserDataEntityState.EditData.password = res[0].password;
            UserDataEntityState.EditData.sex = res[0].sex;
            UserDataEntityState.EditData.IsUse = res[0].IsUse;
            UserDataEntityState.EditData.address = res[0].address;
            UserDataEntityState.EditData.phone = res[0].phone;

            UserDataEntityState.EditData.email = res[0].email;
            UserDataEntityState.EditData.level = res[0].level;
            UserDataEntityState.EditData.desc = res[0].desc;

            visible.value = true;
            modalTitle.value = "编辑【用户列表】";
          }
          if (event.target.innerText == "删除") {
            // console.log(event);
            // console.log(record);
            const Id = record.Id;
            deleteMark.value = Id;
            //  const index= (ListDatas.data).findIndex((i:any)=>i.Id==Id);

            //  (ListDatas.data).splice(index,1);
            //console.log(ListDatas.data);
          }
        },
      };
    };
    /***rowActionClick****************/

    return {
      rowActionClick,

      onSelectChange,

      pageSize,
      current1,
      totalCount,
      onShowSizeChange,
      handleTableChange,
      SearchBtn,
      modalTitle,
      visible,
      confirm,
      cancel,
      closeMoadl,
      showCreateModal,

      ...toRefs(UserDataEntityState),
      UserDataEntityState,
    };
  },
});
</script>

<style >
#userList {
   height: calc(100vh - 245px);
  border: 0px solid red;
  box-sizing: border-box;
}
.userPagination {
  border: 0px solid red;
  height: 40px;

  display: flex;
  justify-content:center;
  align-items: center;
}


#userList .ant-table-thead > tr > th, #userList .ant-table-tbody > tr > td
{
  padding:9px 9px;
}
.table-striped td {
 
}
.TableMyHeaderRow{
  background-color: red;
}

 .ant-table-tbody .ant-table-row:nth-child(odd) {
  /* background-color: red;; */
}
 .ant-table-tbody .ant-table-row:nth-child(even) {
  background-color: #fafafa;
}

 .ant-table-thead > tr > th {
  padding-left: px;
  font-size: 14px;
 color:black;
  background:rgba(143, 178, 207, 0.405)  !important;
}






</style>