import '../styles.css';

export const metadata = {
  title: '泡泡爪 | 宠物洗护预约',
  description: '泡泡爪宠物洗护预约官网，提供温柔洗护、毛发护理、SPA 香氛和精致造型服务。',
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
