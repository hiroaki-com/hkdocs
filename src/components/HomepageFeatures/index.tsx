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
  title: string;
  Icon: SvgIconType;
  description: JSX.Element;
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
              id: 'homepage.features.tech.title',
              message: 'Tech',
            })}
            Icon={IconBook}
            description={
              <Translate id="homepage.features.tech.description">
                日常の学びやブログ記事を整理。
              </Translate>
            }
            link="/docs/category/tech"
          />
          <FeatureCard
            title={translate({
              id: 'homepage.features.exams.title',
              message: '試験',
            })}
            Icon={IconGraduationCap}
            description={
              <Translate id="homepage.features.exams.description">
                資格試験の学習ノートや感想など。
              </Translate>
            }
            link="/docs/category/exams"
          />
          <FeatureCard
            title={translate({
              id: 'homepage.features.blog.title',
              message: 'ブログ',
            })}
            Icon={IconEdit}
            description={
              <Translate id="homepage.features.blog.description">
                技術的な学びに関するフランクな記事。
              </Translate>
            }
            link="/blog"
          />
          <FeatureCard
            title={translate({
              id: 'homepage.features.diary.title',
              message: '日記',
            })}
            Icon={IconClock}
            description={
              <Translate id="homepage.features.diary.description">
                日々の記録や個人的な雑記メモ。
              </Translate>
            }
            link="/diary"
          />
          <FeatureCard
            title={translate({
              id: 'homepage.features.browserMemo.title',
              message: 'ブラウザメモ',
            })}
            Icon={IconBrowserMemo}
            description={
              <Translate id="homepage.features.browserMemo.description">
                ブラウザだけで使える軽量メモ機能。
              </Translate>
            }
            link="/browser-memo"
          />
          <FeatureCard
            title={translate({
              id: 'homepage.features.profile.title',
              message: 'プロフィール',
            })}
            Icon={IconUser}
            description={
              <Translate id="homepage.features.profile.description">
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
