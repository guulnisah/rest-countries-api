import React from 'react';

const LazyHomePage = React.lazy(() => import('./HomePage'));

const WithSuspense = () => (
    <React.Suspense>
        <LazyHomePage />
    </React.Suspense>
);

export default WithSuspense;
