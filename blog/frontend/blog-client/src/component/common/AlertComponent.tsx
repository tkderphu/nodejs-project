function AlertConponent(props: {hasError?:boolean, loading?:boolean, error?: any}) {
    return (
        <div className="mb-3">
        {props.hasError && <div className="alert alert-danger text-truncate">{JSON.stringify(props.error)}</div>}
        {props?.loading && <div className="mt-3 spinner-border" role="status"/>}
        </div>
    )
}
export default AlertConponent