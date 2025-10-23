// Test file to verify LightTip type definitions
import { LightTip } from './deps.js'

// Test basic usage
LightTip.success('操作成功！', 3000)
LightTip.error('发生错误', 2000)
LightTip.warning('注意', 2500)
LightTip.info('提示信息')

// Test with options
LightTip.show({
  content: '自定义消息',
  duration: 1500,
  type: 'success',
  position: 'top',
  onClose: () => console.log('通知已关闭'),
  onShow: () => console.log('通知已显示')
})

// Test close methods
LightTip.close()
LightTip.closeAll()

export {}