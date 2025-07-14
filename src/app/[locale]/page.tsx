import { getTranslations } from 'next-intl/server';

import CustomButton from '@/components/CustomButton';
import { Link } from '@/i18n/navigation';

export default async function Home() {
  const t = await getTranslations();

  return (
    <div>
      <main>
        <h1>{t('welcome')}</h1>
        <CustomButton>{t('clickMe')}</CustomButton>
        <Link href="/" locale="pl">
          Polish
        </Link>
        <Link href="/" locale="en">
          English
        </Link>
      </main>
    </div>
  );
}
