# notion2blog

���� Cloudflare  �� worker ת�� notion.so �����ݣ����ɲ��͡�

### ����

```javascript
// ����ĳ��������
const MY_DOMAIN = "www.chiro.work"
// ����ĳ����notion����ҳ
const START_PAGE = "https://www.notion.so/chiro2001/Chiro-s-Blog-a5a50b7b9f3c4515a89816ded0f3445f"
```

### ����

1. �� Cloudflare �½���վ
2. �� DNS ����ת�Ƶ� Cloudflare
3. ���һ�� Worker����`main.js`�޸ĺ�Ĵ�����������Ϊ Worker �Ĵ���
4. ����·�ɣ�����`${�������}/*`�������õ� Worker ����
5. ��ɣ����������ҳ��