import { HeaderProps } from '../types';

const Header = (props: HeaderProps) => {
    return <h1>{props.coursename}</h1>;
}

export default Header