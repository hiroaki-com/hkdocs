import React from 'react';
import Translate from '@docusaurus/Translate';
import { Coffee } from 'lucide-react';
import styles from './styles.module.css';

export default function SupportButton(): React.JSX.Element {
  const paymentLink = 'https://donate.stripe.com/cNidRaf8J2zQcWHgKids400';

  return (
    <a
      href={paymentLink}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.supportButton}
    >
      <Coffee className={styles.icon} size={18} />
      <span className={styles.text}>
        <Translate
          id="support.button.text"
          description="The text for the project support button"
        >
          支援する
        </Translate>
      </span>
    </a>
  );
}
