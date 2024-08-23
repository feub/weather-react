import { useState } from 'react';
import { CitySearchForm } from '../components/CitySearchForm';
import { Alert } from '../components/Alert';
import { useToggle } from '../hooks/useToggle';
import { CityList } from '../components/CityList';
import { useOutletContext } from 'react-router-dom';

export function Home() {
    const [theme, setTheme] = useOutletContext();
    const [error, setError] = useState('');
    const [showSearchForm, toggleSearchForm] = useToggle(true);

    return <div className="fade-in">
        {error && <Alert title="Error" content={error} type="danger" />}
        {showSearchForm && <CitySearchForm setError={setError} />}
        <CityList theme={theme} />
    </div>;
}