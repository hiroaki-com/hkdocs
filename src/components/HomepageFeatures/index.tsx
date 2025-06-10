import React from 'react';
import type { JSX, ComponentType, SVGProps } from 'react';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

type SvgIconType = ComponentType<SVGProps<SVGSVGElement>>;

// アイコン定義
const BookIcon: SvgIconType = (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20v-1H6.5a2.5 2.5 0 0 1 0-5H20V9H6.5a2.5 2.5 0 0 1 0-5H20V3H6.5A2.5 2.5 0 0 1 4 5.5v14z"/></svg>;
const EditIcon: SvgIconType = (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
const ClockIcon: SvgIconType = (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const GraduationCapIcon: SvgIconType = (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.66 4 3 6 3s6-1.34 6-3v-5"/></svg>;
const UserIcon: SvgIconType = (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;

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
            title="Tech Memo"
            Icon={BookIcon}
            description={<>日常の学びやブログ記事を整理する場所。</>}
            link="/docs/intro"
          />
          <FeatureCard
            title="Exams"
            Icon={GraduationCapIcon}
            description={<>資格試験の学習ノートやまとめ。</>}
            link="/docs/category/exams"
          />
          <FeatureCard
            title="Blog"
            Icon={EditIcon}
            description={<>技術的な学びに関するフランクな記事。</>}
            link="/blog"
          />
          <FeatureCard
            title="Diary"
            Icon={ClockIcon}
            description={<>日々の記録や個人的な雑記メモ。</>}
            link="/diary"
          />
          <FeatureCard
            title="Profile"
            Icon={UserIcon}
            description={<>私のプロフィールなど。</>}
            link="/profile"
          />
        </div>
      </div>
    </section>
  );
}