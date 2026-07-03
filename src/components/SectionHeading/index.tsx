import React, { JSX, ReactNode } from 'react';
import { translate } from '@docusaurus/Translate';
import styles from './styles.module.css';

type Props = {
  as: 'h2' | 'h3';
  id: string;
  className: string;
  children: ReactNode;
};

/**
 * ホバー時に右側にアンカーリンク('#')を表示する見出しコンポーネント
 */
export default function SectionHeading({ as: Component, id, className, children }: Props): JSX.Element {
  return (
    // h2/h3(Component)に行全体をホバー領域とするためのクラスを適用
    <Component id={id} className={className}>
      {/* テキストとアンカーリンクをspanで囲み、アンカーの位置決めの基準とする */}
      <span className={styles.anchorContainer}>
        {children}
        <a
          className={styles.anchorLink}
          href={`#${id}`}
          aria-label={translate({
            id: 'theme.common.headingLinkTitle',
            message: 'この見出しへの固定リンク',
          })}>
          #
        </a>
      </span>
    </Component>
  );
}
