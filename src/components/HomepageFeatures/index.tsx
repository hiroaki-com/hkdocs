import React from 'react';
import type { JSX, ComponentType } from 'react';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';
import styles from './styles.module.css';

import {
  BookText,
  GraduationCap,
  FilePenLine,
  Clock,
  UserCircle,
  NotebookPen,
  type LucideProps,
} from 'lucide-react';

type SvgIconType = ComponentType<LucideProps>;

const IconBook: SvgIconType = BookText;
const IconEdit: SvgIconType = FilePenLine;
const IconClock: SvgIconType = Clock;
const IconGraduationCap: SvgIconType = GraduationCap;
const IconUser: SvgIconType = UserCircle;
const IconBrowserMemo: SvgIconType = NotebookPen;

type FeatureCardProps = {
  title: string; // This title will be translated via props from HomepageFeatures
  Icon: SvgIconType;
  description: JSX.Element; // This description will be translated via props from HomepageFeatures
  link: string;
};

function FeatureCard({ title, Icon, description, link }: FeatureCardProps): JSX.Element {
  return (
    <Link className={styles.featureCardLink} to={link}>
      <div className={styles.cardHeader}>
        <div className={styles.cardIconWrapper}>
          <Icon className={styles.cardIcon} />
        </div>
        <Heading as="h3" className={styles.featureTitle}>
          {title}
        </Heading>
      </div>
      <p className={styles.featureDescription}>{description}</p>
    </Link>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.featuresSection}>
      <div className="container">
        <div className={styles.featureGrid}>
          <FeatureCard
            title={translate({
              message: 'Tech',
              id: 'homepage.features.tech.title',
              description: 'Title for the Tech feature card on the homepage',
            })}
            Icon={IconBook}
            description={
              <Translate
                id="homepage.features.tech.description"
                description="Description for the Tech feature card on the homepage"
              >
                日常の学びやブログ記事を整理します。
              </Translate>
            }
            link="/docs/category/tech"
          />
          <FeatureCard
            title={translate({
              message: 'Exams',
              id: 'homepage.features.exams.title',
              description: 'Title for the Exams feature card on the homepage',
            })}
            Icon={IconGraduationCap}
            description={
              <Translate
                id="homepage.features.exams.description"
                description="Description for the Exams feature card on the homepage"
              >
                資格試験の学習ノートやまとめます。
              </Translate>
            }
            link="/docs/category/exams"
          />
          <FeatureCard
            title={translate({
              message: 'Blog',
              id: 'homepage.features.blog.title',
              description: 'Title for the Blog feature card on the homepage',
            })}
            Icon={IconEdit}
            description={
              <Translate
                id="homepage.features.blog.description"
                description="Description for the Blog feature card on the homepage"
              >
                技術的な学びに関するフランクな記事です。
              </Translate>
            }
            link="/blog"
          />
          <FeatureCard
            title={translate({
              message: 'Diary',
              id: 'homepage.features.diary.title',
              description: 'Title for the Diary feature card on the homepage',
            })}
            Icon={IconClock}
            description={
              <Translate
                id="homepage.features.diary.description"
                description="Description for the Diary feature card on the homepage"
              >
                日々の記録や個人的な雑記メモです。
              </Translate>
            }
            link="/diary"
          />
          <FeatureCard
            title={translate({
              message: 'Browser Memo',
              id: 'homepage.features.browserMemo.title',
              description: 'Title for the Browser Memo feature card on the homepage',
            })}
            Icon={IconBrowserMemo}
            description={
              <Translate
                id="homepage.features.browserMemo.description"
                description="Description for the Browser Memo feature card on the homepage"
              >
                ブラウザだけで使える軽量メモ機能。
              </Translate>
            }
            link="/browser-memo"
          />
          <FeatureCard
            title={translate({
              message: 'Profile',
              id: 'homepage.features.profile.title',
              description: 'Title for the Profile feature card on the homepage',
            })}
            Icon={IconUser}
            description={
              <Translate
                id="homepage.features.profile.description"
                description="Description for the Profile feature card on the homepage"
              >
                私について。
              </Translate>
            }
            link="/profile"
          />
        </div>
      </div>
    </section>
  );
}
