import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export function NotFound() {
    const error: any = useRouteError();

    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                {
                    isRouteErrorResponse(error) ?
                    <p>{error.status} {error.statusText}</p> :
                    <p>{error?.message || "Unknown Error"}</p>
                }
            </p>
        </div>
    );
}
