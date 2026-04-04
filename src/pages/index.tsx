import React, { useEffect, useState } from 'react';
import type { JSX } from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useLocation } from '@docusaurus/router';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import VideoShowcase from '@site/src/components/VideoShowcase';
import Heading from '@theme/Heading';
import { translate } from '@docusaurus/Translate';

import styles from './index.module.css';

function HomepageHeader(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className={styles.heroTitle}>
          {siteConfig.title}
        </Heading>
        <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
      </div>
    </header>
  );
}

const SunIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

function ThemeToggle(): JSX.Element {
  const [isDark, setIsDark] = useState(
    () => typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme') === 'dark'
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.getAttribute('data-theme') === 'dark');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  const toggle = () => {
    const next = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  };

  const ariaLabel = translate({
    id: 'homepage.themeToggle.ariaLabel',
    message: 'ライト／ダークモード切り替え',
  });

  return (
    <button
      className={styles.themeToggleTrack}
      onClick={toggle}
      aria-label={ariaLabel}
      aria-pressed={isDark}
    >
      <span className={clsx(styles.themeTogglePill, !isDark && styles.themeTogglePillActive)}>
        <SunIcon />
      </span>
      <span className={clsx(styles.themeTogglePill, isDark && styles.themeTogglePillActive)}>
        <MoonIcon />
      </span>
    </button>
  );
}

function SiteControlsSection(): JSX.Element {
  const { i18n: { currentLocale, locales, defaultLocale } } = useDocusaurusContext();
  const { pathname } = useLocation();

  const getLocaleUrl = (locale: string): string => {
    if (locale === defaultLocale) {
      return pathname.replace(new RegExp('^/' + currentLocale), '') || '/';
    }
    return '/' + locale + (pathname.startsWith('/') ? pathname : '/' + pathname);
  };

  const localeAriaLabel = translate({
    id: 'homepage.localeSwitch.ariaLabel',
    message: '言語切り替え',
  });

  const buttons = locales.map((locale) => {
    const isActive = locale === currentLocale;
    const href = getLocaleUrl(locale);
    const className = clsx(styles.localeButton, isActive && styles.localeButtonActive);
    const ariaCurrent: 'page' | undefined = isActive ? 'page' : undefined;
    return (
      <a key={locale} href={href} className={className} aria-current={ariaCurrent}>
        {locale}
      </a>
    );
  });

  return (
    <section className={styles.siteControlsSection}>
      <div className={styles.localeSwitchTrack} aria-label={localeAriaLabel}>
        {buttons}
      </div>
      <ThemeToggle />
    </section>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  const metaDescription = translate({
    id: 'homepage.meta.description',
    message: '私が経験した日々の学びの技術ブログです。ブラウザメモ帳、ニュースサイト一覧、技術・論文のリンク集なども提供しています。',
    description: 'The meta description for the homepage',
  });

  return (
    <Layout title={siteConfig.title} description={metaDescription}>
      <HomepageHeader />
      <main>
        <SiteControlsSection />
        <VideoShowcase />
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
