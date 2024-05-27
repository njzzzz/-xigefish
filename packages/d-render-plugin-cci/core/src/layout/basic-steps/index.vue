<template>
  <div class="basic-steps__wrapper">
    <el-steps :active="stepActive" class="basic-steps" :simple="config.simple" :align-center="config.alignCenter" finish-status="success">
      <template v-for="(option,optionIndex) in options" :key="optionIndex">
        <el-step :title="option.title" :icon="option.icon"/>
      </template>
    </el-steps>
    <div class="basic-steps-content__wrapper" v-if="!outerKey">
      <template v-for="({children: step,...stepConfig},optionIndex) in options" :key="optionIndex">
        <div v-show="optionIndex === active" class="basic-step-content">
          <div class="basic-step-content__title">{{stepConfig.title}}</div>
          <slot
            name="item"
            :optionIndex="optionIndex"
            :children="step"
            :is-show="optionIndex === active"
            :addOptionChild="addOptionChild"
            :deleteOptionChild="deleteOptionChild"
            :copyOptionChild="copyOptionChild"
            :updateOptionChildren="updateOptionChildren"
            :updateOptionChild="updateOptionChild"></slot>
        </div>
      </template>
    </div>
    <div class="basic-steps__handle" v-if="!outerKey">
      <cip-button-text v-if="config.cancel && active === 0" @click="beforeCancel">{{config.cancelText || '取消'}}</cip-button-text>
      <cip-button-text @click="prevStep" v-if="active>0" :disabled="false">上一步</cip-button-text>
      <cip-button-text type="primary" @click="nextStep" v-if="active<options.length-1" :disabled="false">下一步</cip-button-text>
      <cip-button-text v-if="config.finish && active === options.length-1" @click="beforeFinish">{{config.finishText || '完成'}}</cip-button-text>
    </div>
  </div>
</template>
<script>
import { computed, ref } from 'vue'
import { ElSteps, ElStep, ElMessage } from 'element-plus'
import CipButtonText from '@xigefish/components/cip-button-text'
import { layoutProps, useFormLayoutOptions } from '@xigefish/d-render-shared'
export default {
  name: 'BasicGrid',
  props: layoutProps,
  components: {
    ElSteps, ElStep, CipButtonText
  },
  emits: ['validate', 'submit', 'cancel'],
  setup (props, { emit }) {
    const formLayoutOptions = useFormLayoutOptions({ props, emit })
    // 内部步骤
    const active = ref(0)
    const outerKey = computed(() => {
      return props.config?.outerKey ?? ''
    })
    const stepActive = computed(() => {
      return outerKey.value ? props.model[outerKey.value] : active.value
    })

    const prevStep = () => {
      active.value--
    }
    const validate = (result, cb) => {
      if (result) {
        cb()
      } else {
        ElMessage.warning('请正确的填写表单内容')
      }
    }
    const nextStep = () => {
      if (props.config.validate) {
        emit('validate', (result) => {
          validate(result, () => {
            active.value++
          })
        })
      } else {
        active.value++
      }
    }
    const beforeFinish = () => {
      emit('validate', (result) => {
        validate(result, () => {
          emit('submit')
        })
      })
    }
    const beforeCancel = () => {
      emit('cancel')
    }
    return {
      active,
      prevStep,
      nextStep,
      beforeFinish,
      beforeCancel,
      stepActive,
      outerKey,
      ...formLayoutOptions
    }
  }
}
</script>
