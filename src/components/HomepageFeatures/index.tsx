import React from 'react';
import type { JSX, ComponentType } from 'react';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
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
  title: JSX.Element;
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
            title={<Translate id="homepage.features.tech.title">Tech</Translate>}
            Icon={IconBook}
            description={
              <Translate id="homepage.features.tech.description">
                日常の学びやブログ記事を整理します。
              </Translate>
            }
            link="/docs/category/tech"
          />
          <FeatureCard
            title={<Translate id="homepage.features.exams.title">Exams</Translate>}
            Icon={IconGraduationCap}
            description={
              <Translate id="homepage.features.exams.description">
                資格試験の学習ノートやまとめます。
              </Translate>
            }
            link="/docs/category/exams"
          />
          <FeatureCard
            title={<Translate id="homepage.features.blog.title">Blog</Translate>}
            Icon={IconEdit}
            description={
              <Translate id="homepage.features.blog.description">
                技術的な学びに関するフランクな記事です。
              </Translate>
            }
            link="/blog"
          />
          <FeatureCard
            title={<Translate id="homepage.features.diary.title">Diary</Translate>}
            Icon={IconClock}
            description={
              <Translate id="homepage.features.diary.description">
                日々の記録や個人的な雑記メモです。
              </Translate>
            }
            link="/diary"
          />
          <FeatureCard
            title={<Translate id="homepage.features.browser-memo.title">Browser Memo</Translate>}
            Icon={IconBrowserMemo}
            description={
              <Translate id="homepage.features.browser-memo.description">
                ブラウザだけで使える軽量メモ機能。
              </Translate>
            }
            link="/browser-memo"
          />
          <FeatureCard
            title={<Translate id="homepage.features.profile.title">Profile</Translate>}
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
