function AlertConponent(props: {hasError:boolean, loading:boolean, error: any}) {
    return (
        <>
        {props.hasError && <div className="alert alert-danger">{props.error}</div>}
        {props.loading && <div className="mt-3 spinner-border" role="status"/>}
        </>
    )
}
export default AlertConponent