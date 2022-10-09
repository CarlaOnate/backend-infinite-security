import { CheckCircleFilled, ExclamationCircleFilled } from '@ant-design/icons';

const renderEstatus = (_, record) => {
  const { estatus } = record;
  const statusClass = {
    'Activo': 'usuario-activo',
    'Bloqueado': 'usuario-bloqueado',
    'Eliminado': 'usuario-eliminado'
  }
  return (
    <div key={`${record.username}+${record.pk}`} className={`tag ${statusClass[estatus]}`}><p>{estatus}</p></div>
  )
}

const renderVerified = (_, record) => {
  const { verified } = record;
  const verifiedIcon = verified ? <CheckCircleFilled/> : <ExclamationCircleFilled />
  return (
    <div key={`${record.username}+${record.pk}`} className={`tag ${verified && 'verificado'}`}>{verifiedIcon}</div>
  )
}

export const adminManagementTableColumn = [
  {
    title: 'ID',
    dataIndex: 'pk',
    key: 'pk',
  },
  {
    title: 'Nombre',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: 'Rol',
    dataIndex: 'rolName',
    key: 'rolName',
  },
  {
    title: 'Estatus',
    render: renderEstatus,
    key: 'estatus',
  },
  {
    title: 'Departamento',
    dataIndex: 'departament',
    key: 'departament',
  },
  {
    title: 'Oficio',
    dataIndex: 'oficio',
    key: 'oficio',
  }
]

export const userListTableColumns = [
  {
    title: 'ID',
    dataIndex: 'pk',
    key: 'pk',
  },
  {
    title: 'Nombre',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: 'Rol',
    dataIndex: 'rolName',
    key: 'rolName',
  },
  {
    title: 'Estatus',
    render: renderEstatus,
    key: 'estatus',
  },
  {
    title: 'Departamento',
    dataIndex: 'departament',
    key: 'departament',
  },
  {
    title: 'Oficio',
    dataIndex: 'oficio',
    key: 'oficio',
  },
  {
    title: 'verified',
    render: renderVerified,
    key: 'verified',
  }
]