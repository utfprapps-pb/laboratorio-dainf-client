import Swal from 'sweetalert2';

export class Exception {

  static addMessage(error: any): void {
    if (error.error != null && error.error.message != null) {
      Swal.fire('Atenção!', this.getMessage(error), 'error');
    } else if (error.status === 403) {
      Swal.fire('Atenção!', 'Acesso negado', 'error');
    } else {
      Swal.fire('Atenção!', 'Ocorreu um erro ao remover o registro', 'error');
    }
  }

  static getMessage(error: any): string {
    const message = error.error.message.toString().toUpperCase();
    if (message.includes('ConstraintViolationException'.toUpperCase())) {
      return 'Erro ao remover o registro, o mesmo possui vínculo com outros registros.';
    } else {
      return 'Ocorreu um erro ao remover o registro';
    }
  }
}
