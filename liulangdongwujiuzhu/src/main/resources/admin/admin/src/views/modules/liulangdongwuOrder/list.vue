<template>
    <div class="main-content">
        <el-dialog title="审核" :visible.sync="liulangdongwuOrderYesnoTypesVisible">
            <el-form :model="form">
                <input type="hidden" v-model="form.id">
                <el-form-item label="审核" >
                    <el-select v-model="form.liulangdongwuOrderYesnoTypes" placeholder="请选择申请状态">
                        <el-option label="同意" value="2"></el-option>
                        <el-option label="拒绝" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="审核意见">
                    <el-input type="textarea" v-model="form.liulangdongwuOrderYesnoText" placeholder="审核意见"></el-input>
                </el-form-item>
                <el-form-item v-if="form.liulangdongwuOrderYesnoTypes==2" label="快递公司">
                    <el-input v-model="form.liulangdongwuOrderCourierName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item v-if="form.liulangdongwuOrderYesnoTypes==2" label="快递单号">
                    <el-input v-model="form.liulangdongwuOrderCourierNumber" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="liulangdongwuOrderYesnoTypesVisible = false">取 消</el-button>
                <el-button type="primary" @click="liulangdongwuOrderYesnoTypesShenhe">审 核</el-button>
            </div>
        </el-dialog>
        <!-- 条件查询 -->
        <div v-if="showFlag">
            <el-form :inline="true" :model="searchForm" class="form-content">
                <el-row :gutter="20" class="slt" :style="{justifyContent:contents.searchBoxPosition=='1'?'flex-start':contents.searchBoxPosition=='2'?'center':'flex-end'}">
                 
                     <el-form-item :label="contents.inputTitle == 1 ? '申请领养编号' : ''">
                         <el-input prefix-icon="el-icon-search" v-model="searchForm.liulangdongwuOrderUuidNumber" placeholder="申请领养编号" clearable></el-input>
                     </el-form-item>
                                                 
                     <el-form-item :label="contents.inputTitle == 1 ? '领养状态' : ''">
                        <el-select v-model="searchForm.liulangdongwuOrderTypes" placeholder="请选择领养状态">
                            <el-option label="=-请选择-=" value=""></el-option>
                            <el-option
                               v-for="(item,index) in liulangdongwuOrderTypesSelectSearch"
                               v-bind:key="index"
                               :label="item.indexName"
                               :value="item.codeIndex">
                            <!--lable是要展示的名称-->
                            <!--value是值-->
                            </el-option>
                        </el-select>
                     </el-form-item>

         
                     <el-form-item :label="contents.inputTitle == 1 ? '申请状态' : ''">
                        <el-select v-model="searchForm.liulangdongwuOrderYesnoTypes" placeholder="请选择申请状态">
                            <el-option label="=-请选择-=" value=""></el-option>
                            <el-option
                               v-for="(item,index) in liulangdongwuOrderYesnoTypesSelectSearch"
                               v-bind:key="index"
                               :label="item.indexName"
                               :value="item.codeIndex">
                            <!--lable是要展示的名称-->
                            <!--value是值-->
                            </el-option>
                        </el-select>
                     </el-form-item>

                                
                                                                                                                                                                                                                             
                    <el-form-item :label="contents.inputTitle == 1 ? '流浪动物名称' : ''">
                        <el-input prefix-icon="el-icon-search" v-model="searchForm.liulangdongwuName" placeholder="流浪动物名称" clearable></el-input>
                    </el-form-item>
                                         
                    <el-form-item :label="contents.inputTitle == 1 ? '动物类型' : ''">
                        <el-select v-model="searchForm.liulangdongwuTypes" placeholder="请选择动物类型">
                            <el-option label="=-请选择-=" value=""></el-option>
                            <el-option
                                    v-for="(item,index) in liulangdongwuTypesSelectSearch"
                                    v-bind:key="index"
                                    :label="item.indexName"
                                    :value="item.codeIndex">
                                <!--lable是要展示的名称-->
                                <!--value是值-->
                            </el-option>
                        </el-select>
                    </el-form-item>
                     
                                                             
                                                             
                                                                                 
                    <el-form-item :label="contents.inputTitle == 1 ? '用户姓名' : ''">
                        <el-input prefix-icon="el-icon-search" v-model="searchForm.yonghuName" placeholder="用户姓名" clearable></el-input>
                    </el-form-item>
                                                                                                                         
                    

                    <el-form-item>
                        <el-button type="success" @click="search()">查询<i class="el-icon-search el-icon--right"/></el-button>
                    </el-form-item>
                </el-row>
                <el-row class="ad" :style="{justifyContent:contents.btnAdAllBoxPosition=='1'?'flex-start':contents.btnAdAllBoxPosition=='2'?'center':'flex-end'}">
                    <el-form-item>
                        <el-button
                                v-if="isAuth('liulangdongwuOrder','新增')"
                                type="success"
                                icon="el-icon-plus"
                                @click="addOrUpdateHandler()"
                        >新增</el-button>
                        &nbsp;
                        <el-button
                                v-if="isAuth('liulangdongwuOrder','删除')"
                                :disabled="dataListSelections.length <= 0"
                                type="danger"
                                icon="el-icon-delete"
                                @click="deleteHandler()"
                        >删除</el-button>
                        &nbsp;
                        <el-button
                                v-if="isAuth('liulangdongwuOrder','报表')"
                                type="success"
                                icon="el-icon-pie-chart"
                                @click="chartDialog()"
                        >报表</el-button>
                        &nbsp;
                        <a style="text-decoration:none" class="el-button el-button--success"
                           v-if="isAuth('liulangdongwuOrder','导入导出')"
                           icon="el-icon-download"
                           href="http://localhost:8080/liulangdongwujiuzhu/upload/liulangdongwuOrderMuBan.xls"
                        >批量导入流浪动物领养数据模板</a>
                        &nbsp;
                        <el-upload
                                v-if="isAuth('liulangdongwuOrder','导入导出')"
                                style="display: inline-block"
                                :action="getActionUrl"
                                :on-success="liulangdongwuOrderUploadSuccess"
                                :on-error="liulangdongwuOrderUploadError"
                                :show-file-list = false>
                            <el-button
                                    v-if="isAuth('liulangdongwuOrder','导入导出')"
                                    type="success"
                                    icon="el-icon-upload2"
                            >批量导入流浪动物领养数据</el-button>
                        </el-upload>
                        &nbsp;
                        <!-- 导出excel -->
                        <download-excel v-if="isAuth('liulangdongwuOrder','导入导出')" style="display: inline-block" class = "export-excel-wrapper" :data = "dataList" :fields = "json_fields" name = "liulangdongwuOrder.xls">
                            <!-- 导出excel -->
                            <el-button
                                    type="success"
                                    icon="el-icon-download"
                            >导出</el-button>
                        </download-excel>
                        &nbsp;
                    </el-form-item>
                </el-row>
            </el-form>
            <div class="table-content">
                <el-table class="tables" :size="contents.tableSize" :show-header="contents.tableShowHeader"
                          :header-row-style="headerRowStyle" :header-cell-style="headerCellStyle"
                          :border="contents.tableBorder"
                          :fit="contents.tableFit"
                          :stripe="contents.tableStripe"
                          :row-style="rowStyle"
                          :cell-style="cellStyle"
                          :style="{width: '100%',fontSize:contents.tableContentFontSize,color:contents.tableContentFontColor}"
                          v-if="isAuth('liulangdongwuOrder','查看')"
                          :data="dataList"
                          v-loading="dataListLoading"
                          @selection-change="selectionChangeHandler">
                    <el-table-column  v-if="contents.tableSelection"
                                      type="selection"
                                      header-align="center"
                                      align="center"
                                      width="50">
                    </el-table-column>
                    <el-table-column label="索引" v-if="contents.tableIndex" type="index" width="50" />
                    <el-table-column  :sortable="contents.tableSortable" :align="contents.tableAlign"
                                      prop="addressName"
                                      header-align="center"
                                      label="收货人">
                        <template slot-scope="scope">
                            {{scope.row.addressName}}
                        </template>
                    </el-table-column>
                    <el-table-column  :sortable="contents.tableSortable" :align="contents.tableAlign"
                                      prop="addressPhone"
                                      header-align="center"
                                      label="电话">
                        <template slot-scope="scope">
                            {{scope.row.addressPhone}}
                        </template>
                    </el-table-column>
                    <el-table-column  :sortable="contents.tableSortable" :align="contents.tableAlign"
                                      prop="addressDizhi"
                                      header-align="center"
                                      label="地址">
                        <template slot-scope="scope">
                            {{scope.row.addressDizhi}}
                        </template>
                    </el-table-column>
                    <el-table-column  :sortable="contents.tableSortable" :align="contents.tableAlign"
                                      prop="liulangdongwuName"
                                      header-align="center"
                                      label="流浪动物名称">
                        <template slot-scope="scope">
                            {{scope.row.liulangdongwuName}}
                        </template>
                    </el-table-column>
                    <el-table-column :sortable="contents.tableSortable" :align="contents.tableAlign" prop="liulangdongwuPhoto"
                               header-align="center"
                               width="200"
                               label="流浪动物照片">
                        <template slot-scope="scope">
                            <div v-if="scope.row.liulangdongwuPhoto">
                                <img :src="$base.url+scope.row.liulangdongwuPhoto" width="100" height="100">
                            </div>
                            <div v-else>无图片</div>
                        </template>
                    </el-table-column>
                    <el-table-column  :sortable="contents.tableSortable" :align="contents.tableAlign"
                                      prop="liulangdongwuTypes"
                                      header-align="center"
                                      label="动物类型">
                        <template slot-scope="scope">
                            {{scope.row.liulangdongwuValue}}
                        </template>
                    </el-table-column>
                    <el-table-column  :sortable="contents.tableSortable" :align="contents.tableAlign"
                                      prop="yonghuName"
                                      header-align="center"
                                      label="用户姓名">
                        <template slot-scope="scope">
                            {{scope.row.yonghuName}}
                        </template>
                    </el-table-column>

                    <el-table-column  :sortable="contents.tableSortable" :align="contents.tableAlign"
                                   prop="liulangdongwuOrderUuidNumber"
                                   header-align="center"
                                   label="申请领养编号">
                        <template slot-scope="scope">
                            {{scope.row.liulangdongwuOrderUuidNumber}}
                        </template>
                    </el-table-column>

                    <el-table-column  :sortable="contents.tableSortable" :align="contents.tableAlign"
                                   prop="liulangdongwuOrderCourierName"
                                   header-align="center"
                                   label="快递公司">
                        <template slot-scope="scope">
                            {{scope.row.liulangdongwuOrderCourierName}}
                        </template>
                    </el-table-column>

                    <el-table-column  :sortable="contents.tableSortable" :align="contents.tableAlign"
                                   prop="liulangdongwuOrderCourierNumber"
                                   header-align="center"
                                   label="快递单号">
                        <template slot-scope="scope">
                            {{scope.row.liulangdongwuOrderCourierNumber}}
                        </template>
                    </el-table-column>
                    <el-table-column  :sortable="contents.tableSortable" :align="contents.tableAlign"
                                      prop="liulangdongwuOrderTypes"
                                      header-align="center"
                                      label="领养状态">
                        <template slot-scope="scope">
                            {{scope.row.liulangdongwuOrderValue}}
                        </template>
                    </el-table-column>
                    <el-table-column  :sortable="contents.tableSortable" :align="contents.tableAlign"
                                      prop="liulangdongwuOrderYesnoTypes"
                                      header-align="center"
                                      label="申请状态">
                        <template slot-scope="scope">
                            {{scope.row.liulangdongwuOrderYesnoValue}}
                        </template>
                    </el-table-column>
                    <el-table-column  :sortable="contents.tableSortable" :align="contents.tableAlign"
                                      prop="liulangdongwuOrderYesnoText"
                                      header-align="center"
                                      label="审核意见">
                        <template slot-scope="scope">
                            <span v-if="scope.row.liulangdongwuOrderYesnoText != null &&scope.row.liulangdongwuOrderYesnoText.length>10">
                                {{scope.row.liulangdongwuOrderYesnoText.slice(0,10)}}...
                            </span>
                            <span v-else>
                                {{scope.row.liulangdongwuOrderYesnoText}}
                            </span>
                        </template>
                    </el-table-column>

                    <el-table-column  :sortable="contents.tableSortable" :align="contents.tableAlign"
                                   prop="liulangdongwuOrderShenheTime"
                                   header-align="center"
                                   label="审核时间">
                        <template slot-scope="scope">
                            {{scope.row.liulangdongwuOrderShenheTime}}
                        </template>
                    </el-table-column>

                    <el-table-column  :sortable="contents.tableSortable" :align="contents.tableAlign"
                                   prop="insertTime"
                                   header-align="center"
                                   label="订单创建时间">
                        <template slot-scope="scope">
                            {{scope.row.insertTime}}
                        </template>
                    </el-table-column>

                    <el-table-column width="300" :align="contents.tableAlign"
                                     header-align="center"
                                     label="操作">
                        <template slot-scope="scope">
                            <el-button v-if="sessionTable=='false'" type="primary" size="mini" @click="wuyong(scope.row.id)">无用按钮</el-button>
                            <el-button v-if="sessionTable=='false'" type="success" icon="el-icon-printer" size="mini" @click="dayinOpen(scope.row)">打印</el-button>
                            <el-button v-if="isAuth('liulangdongwuOrder','查看')" type="success" icon="el-icon-tickets" size="mini" @click="addOrUpdateHandler(scope.row.id,'info')">详情</el-button>
                            <el-button v-if="isAuth('liulangdongwuOrder','修改')" type="primary" icon="el-icon-edit" size="mini" @click="addOrUpdateHandler(scope.row.id)">修改</el-button>
                            <el-button v-if="isAuth('liulangdongwuOrder','删除')" type="danger" icon="el-icon-delete" size="mini" @click="deleteHandler(scope.row.id)">删除</el-button>
                            <el-button v-if="isAuth('liulangdongwuOrder','审核') && scope.row.liulangdongwuOrderYesnoTypes == 1 " type="primary" icon="el-icon-thumb" size="mini" @click="openYesnoTypes(scope.row.id)">审核</el-button>
            <el-button v-if="isAuth('liulangdongwuOrder','订单') && scope.row.liulangdongwuOrderTypes == 101 && sessionTable=='yonghu' && userId==scope.row.yonghuId" type="primary" icon="el-icon-sold-out" size="mini" @click="refund(scope.row.id)">取消申请</el-button>
<!--            <el-button v-if="isAuth('liulangdongwuOrder','订单') && scope.row.liulangdongwuOrderTypes == 101
&& sessionTable=='users'" type="primary" icon="el-icon-reading" size="mini"
                        @click="openDeliver(scope.row.id)"
            >同意领养</el-button>-->
            <el-button v-if="isAuth('liulangdongwuOrder','订单') && scope.row.liulangdongwuOrderTypes == 103 && sessionTable=='yonghu' && userId==scope.row.yonghuId" type="primary" icon="el-icon-reading" size="mini" @click="receiving(scope.row.id)">收到宠物</el-button>

                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                        clsss="pages"
                        :layout="layouts"
                        @size-change="sizeChangeHandle"
                        @current-change="currentChangeHandle"
                        :current-page="pageIndex"
                        :page-sizes="[10, 20, 50, 100]"
                        :page-size="Number(contents.pageEachNum)"
                        :total="totalPage"
                        :small="contents.pageStyle"
                        class="pagination-content"
                        :background="contents.pageBtnBG"
                        :style="{textAlign:contents.pagePosition==1?'left':contents.pagePosition==2?'center':'right'}"
                ></el-pagination>
            </div>
        </div>
        <!-- 添加/修改页面  将父组件的search方法传递给子组件-->
        <add-or-update v-if="addOrUpdateFlag" :parent="this" ref="addOrUpdate"></add-or-update>

<el-dialog title="发货" :visible.sync="deliverVisible" width="30%">
    <el-form>
        <el-form-item label="快递公司">
            <el-input v-model="liulangdongwuOrderCourierName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="快递单号">
            <el-input v-model="liulangdongwuOrderCourierNumber" autocomplete="off"></el-input>
        </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="deliverVisible = false">取 消</el-button>
        <el-button type="primary" @click="deliver()">发 货</el-button>
    </span>
</el-dialog>
        <el-dialog title="打印" :visible.sync="printVisiable" width="500px">
            <el-form ref="printContent" :model="printFrom" label-width="auto">
                <el-form-item label="发件人">
                    <div  style="display: flex">
                        <el-input v-model="printFrom.kuaidiFajianName" disabled></el-input>
                        :
                        <el-input v-model="printFrom.kuaidiFajianShoujihao" disabled></el-input>
                    </div>
                </el-form-item>
                <el-form-item label="发件人地址">
                    <el-input v-model="printFrom.kuaidiFajianAddress" disabled></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="printContent()" icon="el-icon-printer" type="success">打印</el-button>
              <el-button @click="printVisiable = false">关闭</el-button>
            </span>
        </el-dialog>

        <el-dialog title="统计报表" :visible.sync="chartVisiable" width="80%">
            <el-date-picker v-model="echartsDate" type="year" placeholder="选择年"> </el-date-picker>
            <el-button @click="chartDialog()">查询</el-button>
                <div id="statistic" style="width:100%;height:600px;"></div>

            <span slot="footer" class="dialog-footer">
				<el-button @click="chartVisiable = false">关闭</el-button>
			</span>
        </el-dialog>

    </div>
</template>
<script>
    import AddOrUpdate from "./add-or-update";
    import styleJs from "../../../utils/style.js";
    import utilsJs, {getYearFormat,getMonthFormat,getDateFormat,getDatetimeFormat} from "../../../utils/utils.js";

    export default {
        data() {
        return {
            //发货商品id
            deliverId:null,
			//快递单号
            liulangdongwuOrderCourierNumber:null,
			//快递公司
            liulangdongwuOrderCourierName:null,
			//模态框状态
            deliverVisible:false,
            //打印开始
            printFrom: {
                name1:"",
            },
            printVisiable: false,
            //打印结束
            searchForm: {
                key: ""
            },
            sessionTable : "",//登录账户所在表名
            role : "",//权限
            userId:"",//当前登录人的id
    //级联表下拉框搜索条件
              liulangdongwuTypesSelectSearch : [],
              liulangdongwuErjiTypesSelectSearch : [],
              xingbieTypesSelectSearch : [],
              dongwuZhuangtaiTypesSelectSearch : [],
              jinyongTypesSelectSearch : [],
    //当前表下拉框搜索条件
              liulangdongwuOrderTypesSelectSearch : [],
              liulangdongwuOrderYesnoTypesSelectSearch : [],
            form:{
                id : null,
                liulangdongwuOrderUuidNumber : null,
                addressId : null,
                liulangdongwuId : null,
                yonghuId : null,
                liulangdongwuOrderCourierName : null,
                liulangdongwuOrderCourierNumber : null,
                liulangdongwuOrderTypes : null,
                liulangdongwuOrderYesnoTypes : null,
                liulangdongwuOrderYesnoText : null,
                liulangdongwuOrderShenheTime : null,
                insertTime : null,
                createTime : null,
            },
            dataList: [],
            pageIndex: 1,
            pageSize: 10,
            totalPage: 0,
            dataListLoading: false,
            dataListSelections: [],
            showFlag: true,
            sfshVisiable: false,
            shForm: {},
            chartVisiable: false,
            echartsDate: new Date(),//echarts的时间查询字段
            addOrUpdateFlag:false,
            contents:null,
            layouts: '',

            liulangdongwuOrderYesnoTypesVisible : false,

            //导出excel
            json_fields: {
                //级联表字段
                     '收货人': 'addressName',
                     '电话': 'addressPhone',
                     '地址': 'addressDizhi',
                     '是否默认地址': 'isdefaultTypes',
                     '流浪动物名称': 'liulangdongwuName',
                     '流浪动物照片': 'liulangdongwuPhoto',
                     '动物类型': 'liulangdongwuTypes',
                     '详细类型': 'liulangdongwuErjiTypes',
                     '流浪动物年龄': 'liulangdongwuAge',
                     '疫苗接种': 'liulangdongwuJiezhong',
                     '性别': 'xingbieTypes',
                     '助养金': 'liulangdongwuZuyangjin',
                     '动物状态': 'dongwuZhuangtaiTypes',
                     '用户姓名': 'yonghuName',
                     '用户手机号': 'yonghuPhone',
                     '用户身份证号': 'yonghuIdNumber',
                     '用户头像': 'yonghuPhoto',
                     '用户邮箱': 'yonghuEmail',
                     '余额': 'newMoney',
                     '账户状态': 'jinyongTypes',
                //本表字段
                     '申请领养编号': "liulangdongwuOrderUuidNumber",
                     '快递公司': "liulangdongwuOrderCourierName",
                     '快递单号': "liulangdongwuOrderCourierNumber",
                     '领养状态': "liulangdongwuOrderValue",
                     '申请状态': "liulangdongwuOrderYesnoValue",
                     '审核意见': "liulangdongwuOrderYesnoText",
                     '审核时间': "liulangdongwuOrderShenheTime",
                     '订单创建时间': "insertTime",
            },

            };
        },
        created() {
            this.contents = styleJs.listStyle();
            this.init();
            this.getDataList();
            this.contentStyleChange()
        },
        mounted() {
            //获取当前登录用户的信息
            this.sessionTable = this.$storage.get("sessionTable");
            this.role = this.$storage.get("role");
            this.userId = this.$storage.get("userId");

        },
        filters: {
            htmlfilter: function (val) {
                return val.replace(/<[^>]*>/g).replace(/undefined/g,'');
            }
        },
        components: {
            AddOrUpdate,
        },
        computed: {
            getActionUrl: function() {
                return `/`+this.$base.name+`/file/upload`;
            }
        },
        methods: {
            chartDialog() {
                let _this = this;
                let params = {
                    dateFormat :"%Y", //%Y-%m
                    riqi :getYearFormat(_this.echartsDate),//年
                    // riqi :getMonthFormat(_this.echartsDate),//年月
                    thisTable : {//当前表
                        tableName :'liulangdongwu_order',//当前表表名,
                        sumColum : 'liulangdongwu_order_number', //求和字段
                        date : 'insert_time',//分组日期字段
                        // string : 'liulangdongwu_order_name',//分组字符串字段
                        // types : 'liulangdongwu_order_types',//分组下拉框字段
                    },
                    // joinTable : {//级联表（可以不存在）
                    //     tableName :'yonghu',//级联表表名
                    //     // date : 'insert_time',//分组日期字段
                    //     string : 'yonghu_name',//分组字符串字段
                    //     // types : 'yonghu_types',//分组下拉框字段
                    // }
                }
                _this.chartVisiable = true;
                _this.$nextTick(() => {
                    var statistic = this.$echarts.init(document.getElementById("statistic"), 'macarons');
                    this.$http({
                        url: "barSum",//barCountOne barCountTwo barSumOne barSumTwo
                        method: "get",
                        params: params
                    }).then(({data}) => {
                        if(data && data.code === 0){
                            let yAxisName = "数值";//y轴
                            let xAxisName = "月份";//x轴
                            let series = [];//具体数据值
                            data.data.yAxis.forEach(function (item,index) {//点击可关闭的按钮字符串在后台方法中
                                let tempMap = {};
                                tempMap.name=data.data.legend[index];
                                tempMap.type='bar';
                                tempMap.data=item;
                                series.push(tempMap);
                            })

                            var option = {
                                tooltip: {
                                    trigger: 'axis',
                                    axisPointer: {
                                        type: 'cross',
                                        crossStyle: {
                                            color: '#999'
                                        }
                                    }
                                },
                                toolbox: {
                                    feature: {
                                        // dataView: { show: true, readOnly: false },  // 数据查看
                                        magicType: { show: true, type: ['line', 'bar'] },//切换图形展示方式
                                        // restore: { show: true }, // 刷新
                                        saveAsImage: { show: true }//保存
                                    }
                                },
                                legend: {
                                    data: data.data.legend//标题  可以点击导致某一列数据消失
                                },
                                xAxis: [
                                    {
                                        type: 'category',
                                        axisLabel:{interval: 0},
                                        name: xAxisName,
                                        data: data.data.xAxis,
                                        axisPointer: {
                                            type: 'shadow'
                                        }
                                    }
                                ],
                                yAxis: [
                                    {
                                        type: 'value',//不能改
                                        name: yAxisName,//y轴单位
                                        axisLabel: {
                                            formatter: '{value}' // 后缀
                                        }
                                    }
                                ],
                                series:series//具体数据
                            };
                            statistic.setOption(option,true);
                            window.onresize = function () {
                                statistic.resize();
                            };
                        }else {
                            this.$message({
                                message: "报表未查询到数据",
                                type: "success",
                                duration: 1500,
                                onClose: () => {
                                    this.search();
                                }
                            });
                        }
                    });
                });
                ////饼状图
                //_this.chartVisiable = true;
                // this.$nextTick(()=>{
                //     var statistic = this.$echarts.init(document.getElementById("statistic"),'macarons');
                //     let params = {
                //         tableName: "liulangdongwu_order",
                //         groupColumn: "liulangdongwu_order_types",
                //     }
                //     this.$http({
                //         url: "newSelectGroupCount",//pieSum pieCount
                //         method: "get",
                //         params: params
                //     }).then(({data}) => {
                //         if (data && data.code === 0) {
                //             let res = data.data;
                //             let xAxis = [];
                //             let yAxis = [];
                //             let pArray = []
                //             var option = {};
                //             for(let i=0;i<res.length;i++){
                //                 xAxis.push(res[i].name);
                //                 yAxis.push(res[i].value);
                //                 pArray.push({
                //                     value: res[i].value,
                //                     name: res[i].name
                //                 })
                //                 option = {
                //                     title: {
                //                         text: '保险合同类型统计',
                //                         left: 'center'
                //                     },
                //                     tooltip: {
                //                         trigger: 'item',
                //                         formatter: '{b} : {c} ({d}%)'
                //                     },
                //                     legend: {
                //                         orient: 'vertical',
                //                         left: 'left'
                //                     },
                //                     series: [
                //                         {
                //                             type: 'pie',
                //                             radius: '55%',
                //                             center: ['50%', '60%'],
                //                             data: pArray,
                //                             emphasis: {
                //                                 itemStyle: {
                //                                     shadowBlur: 10,
                //                                     shadowOffsetX: 0,
                //                                     shadowColor: 'rgba(0, 0, 0, 0.5)'
                //                                 }
                //                             }
                //                         }
                //                     ]
                //                 };
                //             }
                //             statistic.setOption(option,true);
                //             window.onresize = function() {
                //                 statistic.resize();
                //             };
                //         }
                //     });
                // })
            },
            contentStyleChange() {
                this.contentSearchStyleChange()
                this.contentBtnAdAllStyleChange()
                this.contentSearchBtnStyleChange()
                this.contentTableBtnStyleChange()
                this.contentPageStyleChange()
            },
            contentSearchStyleChange() {
                this.$nextTick(() => {
                    document.querySelectorAll('.form-content .slt .el-input__inner').forEach(el => {
                        let textAlign = 'left'
                        if(this.contents.inputFontPosition == 2)
                            textAlign = 'center'
                            if (this.contents.inputFontPosition == 3) textAlign = 'right'
                                el.style.textAlign = textAlign
                            el.style.height = this.contents.inputHeight
                            el.style.lineHeight = this.contents.inputHeight
                            el.style.color = this.contents.inputFontColor
                            el.style.fontSize = this.contents.inputFontSize
                            el.style.borderWidth = this.contents.inputBorderWidth
                            el.style.borderStyle = this.contents.inputBorderStyle
                            el.style.borderColor = this.contents.inputBorderColor
                            el.style.borderRadius = this.contents.inputBorderRadius
                            el.style.backgroundColor = this.contents.inputBgColor
                    })
                    if (this.contents.inputTitle) {
                        document.querySelectorAll('.form-content .slt .el-form-item__label').forEach(el => {
                            el.style.color = this.contents.inputTitleColor
                            el.style.fontSize = this.contents.inputTitleSize
                            el.style.lineHeight = this.contents.inputHeight
                        })
                    }
                    setTimeout(() => {
                        document.querySelectorAll('.form-content .slt .el-input__prefix').forEach(el => {
                            el.style.color = this.contents.inputIconColor
                            el.style.lineHeight = this.contents.inputHeight
                        })
                        document.querySelectorAll('.form-content .slt .el-input__suffix').forEach(el => {
                            el.style.color = this.contents.inputIconColor
                            el.style.lineHeight = this.contents.inputHeight
                        })
                        document.querySelectorAll('.form-content .slt .el-input__icon').forEach(el => {
                            el.style.lineHeight = this.contents.inputHeight
                        })
                    }, 10 )
                })
            },
            // 搜索按钮
            contentSearchBtnStyleChange() {
                this.$nextTick(() => {
                    document.querySelectorAll('.form-content .slt .el-button--success').forEach(el => {
                        el.style.height = this.contents.searchBtnHeight
                        el.style.color = this.contents.searchBtnFontColor
                        el.style.fontSize = this.contents.searchBtnFontSize
                        el.style.borderWidth = this.contents.searchBtnBorderWidth
                        el.style.borderStyle = this.contents.searchBtnBorderStyle
                        el.style.borderColor = this.contents.searchBtnBorderColor
                        el.style.borderRadius = this.contents.searchBtnBorderRadius
                        el.style.backgroundColor = this.contents.searchBtnBgColor
                    })
                })
            },
            // 新增、批量删除
            contentBtnAdAllStyleChange() {
                this.$nextTick(() => {
                    document.querySelectorAll('.form-content .ad .el-button--success').forEach(el => {
                        el.style.height = this.contents.btnAdAllHeight
                        el.style.color = this.contents.btnAdAllAddFontColor
                        el.style.fontSize = this.contents.btnAdAllFontSize
                        el.style.borderWidth = this.contents.btnAdAllBorderWidth
                        el.style.borderStyle = this.contents.btnAdAllBorderStyle
                        el.style.borderColor = this.contents.btnAdAllBorderColor
                        el.style.borderRadius = this.contents.btnAdAllBorderRadius
                        el.style.backgroundColor = this.contents.btnAdAllAddBgColor
                    })
                    document.querySelectorAll('.form-content .ad .el-button--danger').forEach(el => {
                        el.style.height = this.contents.btnAdAllHeight
                        el.style.color = this.contents.btnAdAllDelFontColor
                        el.style.fontSize = this.contents.btnAdAllFontSize
                        el.style.borderWidth = this.contents.btnAdAllBorderWidth
                        el.style.borderStyle = this.contents.btnAdAllBorderStyle
                        el.style.borderColor = this.contents.btnAdAllBorderColor
                        el.style.borderRadius = this.contents.btnAdAllBorderRadius
                        el.style.backgroundColor = this.contents.btnAdAllDelBgColor
                    })
                    document.querySelectorAll('.form-content .ad .el-button--warning').forEach(el => {
                        el.style.height = this.contents.btnAdAllHeight
                        el.style.color = this.contents.btnAdAllWarnFontColor
                        el.style.fontSize = this.contents.btnAdAllFontSize
                        el.style.borderWidth = this.contents.btnAdAllBorderWidth
                        el.style.borderStyle = this.contents.btnAdAllBorderStyle
                        el.style.borderColor = this.contents.btnAdAllBorderColor
                        el.style.borderRadius = this.contents.btnAdAllBorderRadius
                        el.style.backgroundColor = this.contents.btnAdAllWarnBgColor
                    })
                })
            },
            // 表格
            rowStyle({row, rowIndex}) {
                if (rowIndex % 2 == 1) {
                    if (this.contents.tableStripe) {
                        return {color: this.contents.tableStripeFontColor}
                    }
                } else {
                    return ''
                }
            },
            cellStyle({row, rowIndex}) {
                if (rowIndex % 2 == 1) {
                    if (this.contents.tableStripe) {
                        return {backgroundColor: this.contents.tableStripeBgColor}
                    }
                } else {
                    return ''
                }
            },
            headerRowStyle({row, rowIndex}) {
                return {color: this.contents.tableHeaderFontColor}
            },
            headerCellStyle({row, rowIndex}) {
                return {backgroundColor: this.contents.tableHeaderBgColor}
            },
            // 表格按钮
            contentTableBtnStyleChange() {
                // this.$nextTick(()=>{
                //   setTimeout(()=>{
                //     document.querySelectorAll('.table-content .tables .el-table__body .el-button--success').forEach(el=>{
                //       el.style.height = this.contents.tableBtnHeight
                //       el.style.color = this.contents.tableBtnDetailFontColor
                //       el.style.fontSize = this.contents.tableBtnFontSize
                //       el.style.borderWidth = this.contents.tableBtnBorderWidth
                //       el.style.borderStyle = this.contents.tableBtnBorderStyle
                //       el.style.borderColor = this.contents.tableBtnBorderColor
                //       el.style.borderRadius = this.contents.tableBtnBorderRadius
                //       el.style.backgroundColor = this.contents.tableBtnDetailBgColor
                //     })
                //     document.querySelectorAll('.table-content .tables .el-table__body .el-button--primary').forEach(el=>{
                //       el.style.height = this.contents.tableBtnHeight
                //       el.style.color = this.contents.tableBtnEditFontColor
                //       el.style.fontSize = this.contents.tableBtnFontSize
                //       el.style.borderWidth = this.contents.tableBtnBorderWidth
                //       el.style.borderStyle = this.contents.tableBtnBorderStyle
                //       el.style.borderColor = this.contents.tableBtnBorderColor
                //       el.style.borderRadius = this.contents.tableBtnBorderRadius
                //       el.style.backgroundColor = this.contents.tableBtnEditBgColor
                //     })
                //     document.querySelectorAll('.table-content .tables .el-table__body .el-button--danger').forEach(el=>{
                //       el.style.height = this.contents.tableBtnHeight
                //       el.style.color = this.contents.tableBtnDelFontColor
                //       el.style.fontSize = this.contents.tableBtnFontSize
                //       el.style.borderWidth = this.contents.tableBtnBorderWidth
                //       el.style.borderStyle = this.contents.tableBtnBorderStyle
                //       el.style.borderColor = this.contents.tableBtnBorderColor
                //       el.style.borderRadius = this.contents.tableBtnBorderRadius
                //       el.style.backgroundColor = this.contents.tableBtnDelBgColor
                //     })

                //   }, 50)
                // })
            },
            // 分页
            contentPageStyleChange() {
                let arr = []
                if (this.contents.pageTotal) arr.push('total')
                if (this.contents.pageSizes) arr.push('sizes')
                if (this.contents.pagePrevNext) {
                    arr.push('prev')
                    if (this.contents.pagePager) arr.push('pager')
                    arr.push('next')
                }
                if (this.contents.pageJumper) arr.push('jumper')
                this.layouts = arr.join()
                this.contents.pageEachNum = 10
            },

            init() {
            },
            search() {
                this.pageIndex = 1;
                this.getDataList();
            },
            // 获取数据列表
            getDataList() {
                this.dataListLoading = true;
                let params = {
                    page: this.pageIndex,
                    limit: this.pageSize,
                    sort: 'id',
                }

                                                                                                                                                                                                                             
                if (this.searchForm.liulangdongwuName!= '' && this.searchForm.liulangdongwuName!= undefined) {
                    params['liulangdongwuName'] = '%' + this.searchForm.liulangdongwuName + '%'
                }
                                         
                if (this.searchForm.liulangdongwuTypes!= '' && this.searchForm.liulangdongwuTypes!= undefined) {
                    params['liulangdongwuTypes'] = this.searchForm.liulangdongwuTypes
                }
                     
                if (this.searchForm.liulangdongwuErjiTypes!= '' && this.searchForm.liulangdongwuErjiTypes!= undefined) {
                    params['liulangdongwuErjiTypes'] = this.searchForm.liulangdongwuErjiTypes
                }
                                                             
                if (this.searchForm.xingbieTypes!= '' && this.searchForm.xingbieTypes!= undefined) {
                    params['xingbieTypes'] = this.searchForm.xingbieTypes
                }
                                                             
                if (this.searchForm.dongwuZhuangtaiTypes!= '' && this.searchForm.dongwuZhuangtaiTypes!= undefined) {
                    params['dongwuZhuangtaiTypes'] = this.searchForm.dongwuZhuangtaiTypes
                }
                                                                                 
                if (this.searchForm.yonghuName!= '' && this.searchForm.yonghuName!= undefined) {
                    params['yonghuName'] = '%' + this.searchForm.yonghuName + '%'
                }
                                                                                                                         
                if (this.searchForm.jinyongTypes!= '' && this.searchForm.jinyongTypes!= undefined) {
                    params['jinyongTypes'] = this.searchForm.jinyongTypes
                }
                                     
                if (this.searchForm.liulangdongwuOrderUuidNumber!= '' && this.searchForm.liulangdongwuOrderUuidNumber!= undefined) {
                    params['liulangdongwuOrderUuidNumber'] = '%' + this.searchForm.liulangdongwuOrderUuidNumber + '%'
                }
                                                 
                if (this.searchForm.liulangdongwuOrderTypes!= '' && this.searchForm.liulangdongwuOrderTypes!= undefined) {
                    params['liulangdongwuOrderTypes'] = this.searchForm.liulangdongwuOrderTypes
                }
         
                if (this.searchForm.liulangdongwuOrderYesnoTypes!= '' && this.searchForm.liulangdongwuOrderYesnoTypes!= undefined) {
                    params['liulangdongwuOrderYesnoTypes'] = this.searchForm.liulangdongwuOrderYesnoTypes
                }
                                
                params['liulangdongwuOrderDelete'] = 1// 逻辑删除字段 1 未删除 2 删除


                this.$http({
                    url: "liulangdongwuOrder/page",
                    method: "get",
                    params: params
                }).then(({data}) => {
                    if(data && data.code === 0){
                        this.dataList = data.data.list;
                        this.totalPage = data.data.total;
                    }else{
                        this.dataList = [];
                        this.totalPage = 0;
                    }
                    this.dataListLoading = false;
                });

                //查询级联表搜索条件所有列表
                this.$http({
                    url: "dictionary/page?dicCode=liulangdongwu_types&page=1&limit=100",
                    method: "get",
                    page: 1,
                    limit: 100,
                }).then(({data}) => {
                    if(data && data.code === 0){
                        this.liulangdongwuTypesSelectSearch = data.data.list;
                    }
                });
                this.$http({
                    url: "dictionary/page?dicCode=liulangdongwu_erji_types&page=1&limit=100",
                    method: "get",
                    page: 1,
                    limit: 100,
                }).then(({data}) => {
                    if(data && data.code === 0){
                        this.liulangdongwuErjiTypesSelectSearch = data.data.list;
                    }
                });
                this.$http({
                    url: "dictionary/page?dicCode=xingbie_types&page=1&limit=100",
                    method: "get",
                    page: 1,
                    limit: 100,
                }).then(({data}) => {
                    if(data && data.code === 0){
                        this.xingbieTypesSelectSearch = data.data.list;
                    }
                });
                this.$http({
                    url: "dictionary/page?dicCode=dongwu_zhuangtai_types&page=1&limit=100",
                    method: "get",
                    page: 1,
                    limit: 100,
                }).then(({data}) => {
                    if(data && data.code === 0){
                        this.dongwuZhuangtaiTypesSelectSearch = data.data.list;
                    }
                });
                this.$http({
                    url: "dictionary/page?dicCode=jinyong_types&page=1&limit=100",
                    method: "get",
                    page: 1,
                    limit: 100,
                }).then(({data}) => {
                    if(data && data.code === 0){
                        this.jinyongTypesSelectSearch = data.data.list;
                    }
                });
                //查询当前表搜索条件所有列表
                //填充下拉框选项
                this.$http({
                    url: "dictionary/page?dicCode=liulangdongwu_order_types&page=1&limit=100",
                    method: "get",
                }).then(({data}) => {
                    if(data && data.code === 0){
                        this.liulangdongwuOrderTypesSelectSearch = data.data.list;
                    }
                });
                //填充下拉框选项
                this.$http({
                    url: "dictionary/page?dicCode=liulangdongwu_order_yesno_types&page=1&limit=100",
                    method: "get",
                }).then(({data}) => {
                    if(data && data.code === 0){
                        this.liulangdongwuOrderYesnoTypesSelectSearch = data.data.list;
                    }
                });
            },
            //每页数
            sizeChangeHandle(val) {
                this.pageSize = val;
                this.pageIndex = 1;
                this.getDataList();
            },
            // 当前页
            currentChangeHandle(val) {
                this.pageIndex = val;
                this.getDataList();
            },
            // 多选
            selectionChangeHandler(val) {
                this.dataListSelections = val;
            },
            // 添加/修改
            addOrUpdateHandler(id, type) {
                this.showFlag = false;
                this.addOrUpdateFlag = true;
                this.crossAddOrUpdateFlag = false;
                if (type != 'info') {
                    type = 'else';
                }
                this.$nextTick(() => {
                    this.$refs.addOrUpdate.init(id, type);
                });
            },
            // 下载
            download(file) {
                window.open(" ${file} ")
            },
            // 弹出打印模态框
            dayinOpen(item) {
                let _this = this;
                _this.printVisiable = true;
                _this.printFrom=item;
            },
            // 打印内容
            printContent() {
                let _this = this;
                _this.$print(_this.$refs.printContent)
                _this.printVisiable = false;
            },
            // 删除
            deleteHandler(id) {
                var ids = id ? [Number(id)] : this.dataListSelections.map(item => {
                    return Number(item.id);
                });

                this.$confirm(`确定进行[${id ? "删除" : "批量删除"}]操作?`, "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    this.$http({
                        url: "liulangdongwuOrder/delete",
                        method: "post",
                        data: ids
                    }).then(({data}) => {
                        if(data && data.code === 0){
                            this.$message({
                                message: "操作成功",
                                type: "success",
                                duration: 1500,
                                onClose: () => {
                                    this.search();
                                }
                            });
                        }else{
                            this.$message.error(data.msg);
                        }
                    });
                });
            },
            // 导入功能上传文件成功后调用导入方法
            liulangdongwuOrderUploadSuccess(data){
                let _this = this;
                _this.$http({
                    url: "liulangdongwuOrder/batchInsert?fileName=" + data.file,
                    method: "get"
                }).then(({data}) => {
                    if(data && data.code === 0){
                        _this.$message({
                            message: "导入流浪动物领养数据成功",
                            type: "success",
                            duration: 1500,
                            onClose: () => {
                                _this.search();
                            }
                        });
                    }else{
                        _this.$message.error(data.msg);
                    }
                });

            },
            // 导入功能上传文件失败后调用导入方法
            liulangdongwuOrderUploadError(data){
                this.$message.error('上传失败');
            },
	
			//取消申请
			refund(id){
				this.$confirm(`确定要取消申请吗?`, "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
				}).then(() => {
					this.$http({
						url: "liulangdongwuOrder/refund?id="+id,
						method: "post",
					}).then(({ data }) => {
						if (data && data.code === 0) {
							this.$message({
							message:"操作成功",
							type: "success",
							duration: 1500,
								onClose: () => {this.search();}
							});
						} else {
							this.$message.error(data.msg);
						}
					});
				});
			},
			//打开同意领养模态框
			openDeliver(id){
				//清空快递单号
				this.liulangdongwuOrderCourierNumber = null;
				//快递公司
				this.liulangdongwuOrderCourierName = null;
				//赋值
				this.deliverId = id;
				//打开模态框
				this.deliverVisible = true;
			},
			//同意领养
			deliver(){
				let _this = this;
				if(this.liulangdongwuOrderCourierNumber == ""
					|| this.liulangdongwuOrderCourierNumber == null
					|| this.liulangdongwuOrderCourierNumber == "null"){
						return this.$message.error("快递单号不能为空");
				}
				if(this.liulangdongwuOrderCourierName == ""
					|| this.liulangdongwuOrderCourierName == null
					|| this.liulangdongwuOrderCourierName == "null"){
						return this.$message.error("快递公司不能为空");
				}
				_this.$confirm(`确定要同意领养吗?`, "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
				}).then(() => {
					let id = _this.deliverId
					_this.$http({
						url: "liulangdongwuOrder/deliver?id="+id+"&liulangdongwuOrderCourierNumber="+_this.liulangdongwuOrderCourierNumber+"&liulangdongwuOrderCourierName="+_this.liulangdongwuOrderCourierName,
						method: "post",
					}).then(({ data }) => {
						if (data && data.code === 0) {
							_this.$message({
								message:"操作成功",
								type: "success",
								duration: 1500,
								onClose: () => {this.search();
									_this.deliverVisible = false;
								}
							});
						} else {
							_this.$message.error(data.msg);
							_this.deliverVisible = false;
						}
					});
					_this.deliverVisible = false;
				});
			},
			//收到宠物
			receiving(id){
				this.$confirm(`确定要收到宠物吗?`, "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
				}).then(() => {
					this.$http({
						url: "liulangdongwuOrder/receiving?id="+id,
						method: "post",
					}).then(({ data }) => {
						if (data && data.code === 0) {
							this.$message({
								message:"操作成功",
								type: "success",
								duration: 1500,
								onClose: () => {this.search();}
							});
						} else {
							this.$message.error(data.msg);
						}
					});
				});
			},
            openYesnoTypes(id) {
                let _this = this;
                _this.form.id = null;
                _this.form.id = id;
                            _this.form.liulangdongwuOrderYesnoText = null;
                _this.form.liulangdongwuOrderYesnoTypes = "请选择申请状态";
                _this.liulangdongwuOrderYesnoTypesVisible = true;
            },

            liulangdongwuOrderYesnoTypesShenhe() {
                let _this = this;
                if(_this.form.liulangdongwuOrderYesnoTypes == "请选择申请状态"){
                    _this.$message.error("请选择申请状态");return false;
                }
                if(_this.form.liulangdongwuOrderYesnoText == null || _this.form.liulangdongwuOrderYesnoText == ""){
                    _this.$message.error("请输入审核意见");return false;
                }
                if(_this.form.liulangdongwuOrderYesnoTypes==2){
                    if(_this.form.liulangdongwuOrderCourierName == null || _this.form.liulangdongwuOrderCourierName == ""){
                        _this.$message.error("请输入快递公司");return false;
                    }
                    if(_this.form.liulangdongwuOrderCourierNumber == null || _this.form.liulangdongwuOrderCourierNumber == ""){
                        _this.$message.error("请输入快递单号");return false;
                    }
                }else{
                    _this.form.liulangdongwuOrderCourierName=null
                    _this.form.liulangdongwuOrderCourierNumber=null
                }
                this.$http({
                    url:`liulangdongwuOrder/shenhe`,
                    method: "post",
                    data: _this.form
                }).then(({ data }) => {
                    if (data && data.code === 0) {
                        this.$message({
                            message: "审核成功",
                            type: "success",
                            duration: 1500,
                            onClose: () => {
                                _this.liulangdongwuOrderYesnoTypesVisible = false;
                                _this.search();
                            }
                        });
                    } else {
                        this.$message.error(data.msg);
                        _this.liulangdongwuOrderYesnoTypesVisible = false;
                    }
                });
            },            //无用
            wuyong(id) {
                let _this = this;
                _this.$confirm(`确定    操作?`, "提示", {confirmButtonText: "确定",cancelButtonText: "取消",type: "warning"
                }).then(() => {
                    _this.$http({
                        url: "liulangdongwuOrder/update",
                        method: "post",
                        data: {
                            id:id,
//                            liulangdongwuOrderTypes:liulangdongwuOrderTypes,
                        }
                    }).then(({data}) => {
                        if(data && data.code === 0){
                            _this.$message({message: "操作成功",type: "success",duration: 1500,onClose: () => {
                                    _this.search();
                                }});
                        }else{
                            _this.$message.error(data.msg);
                        }
                    });
                });
            },
        }
    };
</script>
<style lang="scss" scoped>
.slt {
    margin: 0 !important;
    display: flex;
  }

  .ad {
    margin: 0 !important;
    display: flex;
  }

  .pages {
    & /deep/ el-pagination__sizes{
      & /deep/ el-input__inner {
        height: 22px;
        line-height: 22px;
      }
    }
  }


  .el-button+.el-button {
    margin:0;
  }

  .tables {
	& /deep/ .el-button--success {
		height: 40px;
		color: rgba(255, 255, 255, 1);
		font-size: 14px;
		border-width: 4px;
		border-style: dashed;
		border-color: var(--publicSubColor);
		border-radius: 0;
		background-color: var(--publicMainColor);
	}

	& /deep/ .el-button--primary {
		height: 40px;
		color: rgba(255, 255, 255, 1);
		font-size: 14px;
		border-width: 4px;
		border-style: dashed;
		border-color: var(--publicSubColor);
		border-radius: 0;
		background-color: var(--publicMainColor);
	}

	& /deep/ .el-button--danger {
		height: 40px;
		color: rgba(255, 255, 255, 1);
		font-size: 14px;
		border-width: 4px;
		border-style: dashed;
		border-color: var(--publicSubColor);
		border-radius: 0;
		background-color: var(--publicMainColor);
	}

    & /deep/ .el-button {
      margin: 4px;
    }
  }
	.form-content {
		background: transparent;
	}
	.table-content {
		background: transparent;
	}

	.tables /deep/ .el-table__body tr {
				background-color: rgba(255, 255, 255, 1) !important;
				color: rgba(0, 0, 0, 1) !important;
	 }
	.tables /deep/ .el-table__body tr.el-table__row--striped td {
	    background: transparent;
	}
	.tables /deep/ .el-table__body tr.el-table__row--striped {
		background-color: #F5F7FA !important;
		color: #606266 !important;
	}

	 .tables /deep/ .el-table__body tr:hover>td {
	   	   background-color: var(--publicSubColor) !important;
	   	   	   color: rgba(0, 0, 0, 1) !important;
	   	 }</style>


