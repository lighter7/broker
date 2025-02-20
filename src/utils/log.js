import { ElMessage } from 'element-plus';
import * as fs from 'fs';
import path from 'path';

// 日志文件最大大小（字节）
const MAX_LOG_SIZE = 1024 * 1024; // 1MB
// 日志文件路径
const LOG_FILE_PATH = path.join(__dirname, '../logs/error.log');

// 记录错误日志到本地文件
const logErrorToFile = (errorMessage) => {
  try {
    // 检查日志文件大小
    if (fs.existsSync(LOG_FILE_PATH)) {
      const stats = fs.statSync(LOG_FILE_PATH);
      if (stats.size > MAX_LOG_SIZE) {
        // 如果文件超过最大大小，清空文件
        fs.writeFileSync(LOG_FILE_PATH, '');
      }
    }
    // 追加日志信息到文件
    fs.appendFileSync(LOG_FILE_PATH, `${new Date().toISOString()}: ${errorMessage}\n`);
  } catch (error) {
    console.error('记录日志文件出错:', error);
  }
};

// 统一错误处理和日志记录
export const handleError = (error) => {
  let errorMessage = '系统错误，请稍后重试';
  if (error.response) {
    // 服务器返回错误响应
    errorMessage = `请求出错，状态码: ${error.response.status}，错误信息: ${error.response.data.message}`;
  } else if (error.request) {
    // 请求已发送，但没有收到响应
    errorMessage = '与服务端连接超时，请检查网络';
  } else {
    // 其他错误
    errorMessage = `发生未知错误: ${error.message}`;
  }
  // 显示错误提示信息
  ElMessage.error(errorMessage);
  // 记录错误日志到本地文件
  logErrorToFile(errorMessage);
};