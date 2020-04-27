<template>
  <div class="login">
    <ul class="menu">
      <li
        v-for="(item, index) in menuData"
        :key="index"
        @click="handleType(item)"
      >
        {{ item.name }}
      </li>
    </ul>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="重复密码" prop="pass" v-if="mode == 'login'">
        <el-input v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input v-model="ruleForm.code" style="width:50%"></el-input>
        <el-button
          type="danger"
          style="width:50%"
          @click="getCode"
          :disabled="codeStatus"
          >{{ codeText }}</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">{{
          mode === "login" ? "登录" : "注册"
        }}</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { dizhi, testName, testPass } from "@/utils/validate";
import { login } from "@/api/login";
export default {
  name: "login",

  data() {
    var validateUsername = (rule, value, callback) => {
      // this.ruleForm.username = dizhi(value)
      // value = this.ruleForm.username
      if (value === "") {
        callback(new Error("用户名不能为空"));
      } else if (!testName(value)) {
        callback(new Error("用户名格式不正确!"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else if (!testPass(value)) {
        callback(new Error("密码格式不正确!"));
      } else {
        callback();
      }
    };
    var validatePassAgain = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请确认密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      mode: "login",
      menuData: [
        {
          name: "登录",
          type: "login",
        },
        {
          name: "注册",
          type: "register",
        },
      ],
      ruleForm: {
        username: "",
        password: "",
        code: "",
        pass: "",
      },
      codeStatus: false,
      codeText: "获取验证码",
      rules: {
        username: [
          { validator: validateUsername, required: true, trigger: "blur" },
        ],
        password: [
          { validator: validatePass, required: true, trigger: "blur" },
        ],
        pass: [
          { validator: validatePassAgain, required: true, trigger: "blur" },
        ],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
    };
  },
  created() {},
  mounted() {},
  methods: {
    submitForm(formName) {},
    handleType(data) {
      this.mode = data.type;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 获取验证码
    getCode() {
      if (this.ruleForm.username == "") {
        this.$message.error("用户名不能为空");
        return false;
      }
      if (!testName(this.ruleForm.username)) {
        this.$message.error("用户名格式错误");
        return false;
      }
      this.codeStatus = false;
      this.codeText = "发送中";
      setTimeout(() => {
        this.countTime(60);
        //   login({ username: "xxxx", type: "1" })
        //     .then((res) => {})
        //     .catch((error) => {});
      }, 1000);
    },
    //获取验证码倒计时

    countTime(num) {
      if (count) {
        clearInterval(count);
      }
      let time = num;
      var count = setInterval(() => {
        if (time === 0) {
          clearInterval(count);
          this.codeStatus = false;
          this.codeText = "再次获取";
        } else {
          this.codeText = `倒计时${time}秒`;
          time--;
        }
      }, 1000);
    },
  },
};
</script>
<style lang="scss">
.login {
  background: #232323;
  height: 100%;
  position: relative;
  overflow: hidden;
  .menu {
    list-style: none;
    color: #fff;
    font-size: 18px;
    margin-top: 20px;
    li {
      display: inline-block;
      margin: 0 10px;
    }
  }
  .demo-ruleForm {
    position: absolute;
    width: 400px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
