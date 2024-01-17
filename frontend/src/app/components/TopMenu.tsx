import styles from './topmenu.module.css'
import Image from 'next/image';
import TopMenuItem from './TopMenuItem';

export default function TopMenu() {
    return (
        <div className={styles.menucontainer}>
            <Image src={'/img/logo.jpg'} className={styles.logoimg} alt='logo' width={0} height={0} sizes='100vh'/>
            <TopMenuItem title='log out' pageRef='log-out' />
        </div>
    );
}
