<template>
    <div class="login-container">
      <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="rules" ref="loginFormRef" label-position="left">
      <el-form-item prop="username">
        <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="用户名" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input name="password" type="password" @keyup.enter="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="密码" />
      </el-form-item>
      <el-button :size="buttonSize" type="primary" class="button-login" :loading="loading" @click="handleLogin">登录</el-button>
    </el-form>
    </div>
</template>
<script>
import './style/index.less'
import sha1 from 'js-sha1'
import { ElForm, ElFormItem, ElInput, ElButton, version } from 'element-plus'
import { defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { accountService } from '@/api'
import { Token } from '@/lib/token'
export default defineComponent({
  name: 'login',
  props: {
    homeUrl: {
      type: String,
      default: '/'
    }
  },
  components: { ElForm, ElFormItem, ElInput, ElButton },
  setup (props) {
    console.log('element-plus', version)
    const buttonSize = /beta/i.test(version) ? 'small' : 'default'
    const rules = reactive({
      username: [
        {
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }
      ],
      password: [
        {
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }
      ]
    })
    const loginForm = reactive({
      username: (process.env.NODE_ENV === 'production') ? '' : 'admin',
      password: (process.env.NODE_ENV === 'production') ? '' : '1qaz2wsx'
    })
    const loading = ref(false)
    const router = useRouter()
    const loginFormRef = ref(null)
    function handleLogin () {
      loginFormRef.value.validate(async (valid) => {
        if (valid) {
          loading.value = true
          // 账户密码加密
          const encryLoginData = {
            username: loginForm.username,
            password: sha1(loginForm.password)
          }
          try {
            const { data } = await accountService.login(encryLoginData)
            if (data) {
              Token.set(data)
              window.location.href = `${router.options.history.base.replace(/\/$/, '')}${props.homeUrl}`
            }
          } finally {
            loading.value = false
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
    return {
      buttonSize,
      loginForm,
      rules,
      loading,
      loginFormRef,
      handleLogin
    }
  }
})
</script>
