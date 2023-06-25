import React from 'react';
import styles from './defaultView.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

function DefaultView () {
  return (
    <div className={styles.defaultViewMain}>
        <div className={styles.defaultViewItem1}>

            <div className={styles.defaultViewItem1E1}>
                <FontAwesomeIcon icon={faSpinner} spinPulse className={styles.blogSpinner} />
            </div>

            <div className={styles.defaultViewItem2E2}>
                <div className={styles.defaultViewItem2Content}>
                    <div className={styles.defaultViewItem1E1Details}>
                        <FontAwesomeIcon icon={faSpinner} spinPulse className={styles.blogSpinner} />
                    </div>
                </div>
                <div className={styles.defaultViewItem2Content}>
                    <div className={styles.defaultViewItem1E1Details}>
                        <FontAwesomeIcon icon={faSpinner} spinPulse className={styles.blogSpinner} />
                    </div>
                </div>
            </div>
        </div>

        <div className={styles.defaultViewBottom}>
            <div className={styles.defaultViewBottomItem1}>
                <div className={styles.BottomContent}>
                    <FontAwesomeIcon icon={faSpinner} className={styles.blogSpinner} spinPulse/>
                </div>

                <div className={styles.BottomContent}>
                    <FontAwesomeIcon icon={faSpinner} className={styles.blogSpinner} spinPulse/>
                </div>

                <div className={styles.BottomContent}>
                    <FontAwesomeIcon icon={faSpinner} className={styles.blogSpinner} spinPulse/>
                </div>

                <div className={styles.BottomContent}>
                    <FontAwesomeIcon icon={faSpinner} className={styles.blogSpinner} spinPulse/>
                </div>

                <div className={styles.BottomContent}>
                    <FontAwesomeIcon icon={faSpinner} className={styles.blogSpinner} spinPulse/>
                </div>
            </div>

            <div className={styles.defaultViewBottomItem2}>
                <div className={styles.BottomContent}>
                    <FontAwesomeIcon icon={faSpinner} className={styles.blogSpinner} spinPulse/>
                </div>

                <div className={styles.BottomContent}>
                    <FontAwesomeIcon icon={faSpinner} className={styles.blogSpinner} spinPulse/>
                </div>

                <div className={styles.BottomContent}>
                    <FontAwesomeIcon icon={faSpinner} className={styles.blogSpinner} spinPulse/>
                </div>

                <div className={styles.BottomContent}>
                    <FontAwesomeIcon icon={faSpinner} className={styles.blogSpinner} spinPulse/>
                </div>

                <div className={styles.BottomContent}>
                    <FontAwesomeIcon icon={faSpinner} className={styles.blogSpinner} spinPulse/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DefaultView
