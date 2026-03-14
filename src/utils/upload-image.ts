import Instance from '@/api/instance';

export default function uploadImage(): Promise<
  | {
      img_name: string;
      img_url: string;
    }
  | string
> {
  return new Promise(resolve => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.addEventListener('change', async () => {
      if (!input.files || input.files.length === 0) {
        resolve('업로드 실패');
        return;
      }

      try {
        const file = input.files[0];
        const formData = new FormData();
        formData.append('img', file);

        const res = await Instance.post('/img', formData).then(res => res.data);

        const img_name = res.data.img_name;
        const img_url = res.data.img_url;

        resolve({ img_name, img_url });
      } catch {
        resolve('업로드 실패');
      }
    });

    input.addEventListener('cancel', () => {
      resolve('업로드 취소');
    });
  });
}
