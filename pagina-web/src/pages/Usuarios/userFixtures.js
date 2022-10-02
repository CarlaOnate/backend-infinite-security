const renderEstatus = (_, record) => {
  const { estatus } = record;
  const statusClass = {
    'Activo': 'usuario-activo',
    'Bloqueado': 'usuario-bloqueado',
    'Eliminado': 'usuario-eliminado'
  }
  return (
    <>
      <div className={`tag ${statusClass[estatus]}`}><p>{estatus}</p></div>
    </>
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
    key: 'departamento',
  },
  {
    title: 'Oficio',
    dataIndex: 'oficio',
    key: 'oficio',
  }
]