<template>
  <div class="login-page" :style="{ backgroundImage: `url(${bgImg})` }">
    <div class="login-page-main">
      <div class="platform-name">{{ platformName }}</div>
      <el-form class="login-page-main-form" ref="formRef" :model="form" :rules="rules">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="账号" :maxlength="32">
            <template #prepend>
              <i class="el-icon-user"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="form.password" placeholder="密码" :maxlength="32">
            <template #prepend>
              <i class="el-icon-lock"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item v-if="needVerificationCode" prop="code" style="display: flex;">
          <el-input v-model="form.code" placeholder="图片验证码" :maxlength="4">
            <template #suffix>
             <div class="login-code" @click="handelUpdateCode"><img :src="imgSrc" alt=""></div>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%;" :size="buttonSize" type="primary" @click="login" :loading="loading">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { v4 as uuid } from 'uuid'
import { ElForm, ElFormItem, ElInput, ElButton, ElLoading, version } from 'element-plus'
import { accountService } from '@/api'
import { Token } from '@/lib/token'
import CipMessage from '@xigefish/components/cip-message'
import defaultBgImg from './images/login-bg.jpg'

export default {
  name: 'login',
  props: {
    homeUrl: {
      type: String,
      default: '/'
    },
    bgImg: {
      type: String,
      default: defaultBgImg
    },
    // 是否需要验证码 默认是
    needVerificationCode: {
      type: Boolean,
      default: true
    }
  },
  components: {
    ElForm, ElFormItem, ElInput, ElButton
  },
  directives: {
    loading: ElLoading.directive
  },
  setup (props) {
    const buttonSize = /beta/i.test(version) ? 'small' : 'default'

    const formRef = ref()
    const imgSrc = ref()
    const flag = ref(false)
    const form = reactive({
      username: (process.env.NODE_ENV === 'production') ? '' : 'admin',
      password: (process.env.NODE_ENV === 'production') ? '' : '1qaz2wsx',
      code: '',
      uuid: ''
    })
    const rules = {
      username: [
        { required: true, message: '请输入账号', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' }
      ],
      code: [
        { required: true, message: '请输入图片验证码', trigger: 'blur' }
      ]
    }

    const loading = ref(false)
    const router = useRouter()

    const login = async () => {
      await formRef.value.validate()
      if (props.needVerificationCode && !flag.value) {
        CipMessage.warning('图片验证码已过期，请点击图片更新')
        return
      }
      loading.value = true
      try {
        const res = await accountService.login({
          ...form
        })
        Token.set(res.data)
        window.location.href = `${router.options.history.base.replace(/\/$/, '')}${props.homeUrl}`
      } finally {
        loading.value = false
      }
    }

    let time
    const handelUpdateCode = () => {
      if (!props.needVerificationCode) return
      clearTimeout(time)
      flag.value = true
      form.uuid = uuid()
      const pic = accountService.getVerificationCode(form)
      imgSrc.value = pic
      time = setTimeout(() => {
        flag.value = false
      }, 120000)
    }

    onMounted(() => {
      handelUpdateCode()
    })

    return {
      formRef,
      form,
      rules,
      loading,
      imgSrc,
      login,
      handelUpdateCode,
      buttonSize,
      platformName: process.env.VUE_APP_PLATFORM_NAME
    }
  }
}
</script>

<style lang="less" scoped>
.login-page{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  // background: url('~@/assets/images/login-bg.jpg');
  background-size: cover;
  &-main{
    transform: translateY(-50%);

    &-form{
      width: 380px;
      margin: 0 auto;
    }
  }
  .login-code {
    width: 100px;
    height: 32px;
    margin-left: 20px;
    overflow: hidden;
    display: flex;
    align-items: center;
  }
}
.platform-name {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-bottom: 18px;
  font-weight: bold;
}
</style>
