import React from 'react';
import PropTypes from 'prop-types';
import '../../styles.scss';
import { Header, TRow, TableWrapper } from '../../../../components/Table/Table';

const FileTable = ({ bodyColumns, title, headerColumns = [], tableFooter = [], active = true }) => (
  <>
    <TableWrapper id={title} title={title} active={active}>
      <table>
        <>
          <tbody>
            {bodyColumns.map(i => (
              <>
                <TRow>
                  {headerColumns.map(j => (
                    <>
                      <Header id={j.value}>{i[j.value]}</Header>
                    </>
                  ))}
                </TRow>
              </>
            ))}
          </tbody>
        </>
        <>
          <tfoot>
            <TRow>
              {tableFooter.map(i => (
                <>
                  <Header>{i.value}</Header>
                </>
              ))}
            </TRow>
          </tfoot>
        </>
      </table>
    </TableWrapper>
  </>
);

export default FileTable;

FileTable.propTypes = {
  tableFooter: PropTypes.array,
  title: PropTypes.string,
  active: PropTypes.bool,
  bodyColumns: PropTypes.array,
  headerColumns: PropTypes.array,
};
