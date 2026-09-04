import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation();

  const isEnglish = i18n.language === 'en' || i18n.language.startsWith('en-');

  const toggleLanguage = () => {
    i18n.changeLanguage(isEnglish ? 'es' : 'en');
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="bg-background/80 backdrop-blur-sm"
      aria-label={isEnglish ? t('a11y.switchToEs') : t('a11y.switchToEn')}
    >
      {isEnglish ? 'ES' : 'EN'}
    </Button>
  );
}