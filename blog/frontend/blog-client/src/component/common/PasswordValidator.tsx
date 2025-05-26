
interface PasswordValidatorProps {
  password: string;
}

export default function PasswordValidator({ password }: PasswordValidatorProps) {
  const rules = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    specialChar: /[^A-Za-z0-9]/.test(password),
  };

  const getIconClass = (valid: boolean) =>
    valid ? 'bi bi-check-circle text-success' : 'bi bi-circle text-secondary';

  return (
    <>
      <p className="mb-2">Yêu cầu mật khẩu:</p>
      <ul className="list-unstyled">
        <li className="small mb-1">
          <i className={`${getIconClass(rules.length)} me-2`} />
          Tối thiểu 8 ký tự
        </li>
        <li className="small mb-1">
          <i className={`${getIconClass(rules.uppercase)} me-2`} />
          Tối thiểu 1 ký tự viết hoa
        </li>
        <li className="small mb-1">
          <i className={`${getIconClass(rules.lowercase)} me-2`} />
          Tối thiểu 1 ký tự viết thường
        </li>
        <li className="small mb-1">
          <i className={`${getIconClass(rules.number)} me-2`} />
          Tối thiểu 1 ký tự là chữ số
        </li>
        <li className="small mb-1">
          <i className={`${getIconClass(rules.specialChar)} me-2`} />
          Tối thiểu 1 ký tự đặc biệt
        </li>
      </ul>
    </>
  );
}
