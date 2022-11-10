import React from 'react';

const LazyCountryPage = React.lazy(() => import('./CountryPage'));

const WithSuspense = () => (
    <React.Suspense>
        <LazyCountryPage />
    </React.Suspense>
);

export default WithSuspense;
