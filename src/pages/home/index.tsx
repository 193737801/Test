import { useEffect, useMemo } from 'react'
import { Route, useHref, useParams, useLocation, useNavigate } from 'react-router-dom';
import { useTest } from '../contract';

export default function Home({}) {
    const pathName = useLocation();
    const navigate = useNavigate();
    const [a] = [useTest(4) ?? undefined]

    useEffect(() => {
        console.log(pathName)
    }, [pathName])

    return (
        <div>
            HomeNumber{a}
            <p onClick={() => {
                let test = {
                    token0: "123",
                    token1: "1245467"
                }
                navigate('/home/' + test.token0 + '/' + test.token1, { state: test })
            }}>text</p>
            <input type="password" defaultValue="nowcoder" placeholder='nowcoder' />
            <input type="checkbox" checked/>
        </div>
    )
}
