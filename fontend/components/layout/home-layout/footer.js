import styles from '@/components/layout/home-layout/footer.module.scss'
import Image from 'next/image'

// icons
import WhiteLogo from '@/components/icons/white-logo'
import FacebookLogo from '@/components/icons/facebook-logo'
import IgLogo from '@/components/icons/ig-logo'
import MailLogo from '@/components/icons/mail-logo'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.containerFluid} container-fluid`}>
        <div className={styles.footerTop}>
          <div className={styles.footerLink}>
            <p>常見問題</p>
            <ul>
              <li>
                <a href="#/">聯絡客服</a>
              </li>
              <li>
                <a href="#/">關於我們</a>
              </li>
              <li>
                <a href="#/">付款方式</a>
              </li>
              <li>
                <a href="#/">取消訂單</a>
              </li>
            </ul>
          </div>
          <WhiteLogo width={110} className={styles.footerLogoWhite} />

          <Image
            className={styles.mountains}
            src="/images/footer/mountains.png"
            alt="mountains"
            width={410}
            height={95}
          />
          <Image
            className={styles.frog}
            src="/images/footer/frog.png"
            alt="frog"
            width={200}
            height={225}
          />
        </div>
        <hr />
        <div className={styles.footerBottom}>
          <div className={styles.footerPolicy}>
            <div className={styles.policyText}>
              <a href="#/">隱私政策</a>
              <a href="#/">服務條款</a>
              <a href="#/">Cookie 設定</a>
            </div>
          </div>
          <div className={styles.socialField}>
            <FacebookLogo size="25" className={styles.iconFB} />
            <IgLogo size="25" className={styles.iconIg} />
            <MailLogo size="25" className={styles.iconEmail} />
          </div>
          <div className={styles.footerCopyright}>
            <p>© 2024 YeahFun 版權所有。</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
