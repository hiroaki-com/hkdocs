import React from 'react';
import type { JSX, ComponentType } from 'react';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
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
            title="Tech"
            Icon={IconBook}
            description={<>日常の学びやブログ記事を整理します。</>}
            link="/docs/category/tech"
          />
          <FeatureCard
            title="Exams"
            Icon={IconGraduationCap}
            description={<>資格試験の学習ノートやまとめます。</>}
            link="/docs/category/exams"
          />
          <FeatureCard
            title="Blog"
            Icon={IconEdit}
            description={<>技術的な学びに関するフランクな記事です。</>}
            link="/blog"
          />
          <FeatureCard
            title="Diary"
            Icon={IconClock}
            description={<>日々の記録や個人的な雑記メモです。</>}
            link="/diary"
          />
          <FeatureCard
            title="Browser Memo"
            Icon={IconBrowserMemo}
            description={<>ブラウザだけで使える軽量メモ機能。</>}
            link="/browser-memo"
          />
          <FeatureCard
            title="Profile"
            Icon={IconUser}
            description={<>私について。</>}
            link="/profile"
          />
        </div>
      </div>
    </section>
  );
}
