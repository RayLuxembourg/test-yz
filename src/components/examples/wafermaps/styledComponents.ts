import styled from 'vue3-styled-components';

const OverviewWrapper = styled.div`
  padding: 20px;
`;

const TextTitle = styled.h2`
  margin: 13px 0;
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  max-height: ${(p: any) => p.mheight};
  display: ${(p: any) => (p.noshow ? 'none' : 'block')};
`;

const Table = styled.table`
  contain: strict;
`;

const Row = styled.tr``;

const HeadRow = styled.tr``;

const Cell = styled.td`
  text-align: center;
  margin: 4px;
`;

const Head = styled.th`
  background-color: #eeeeee;
  text-align: center;
  height: 24px;
  min-width: ${(props: any) => (props.columns ? `calc((100vw - 400px) / ${props.columns})` : '200px')};
  border-bottom: 2px solid #dddddd;
  margin: 4px;
`;

const EmptyCell = styled.td`
  background-color: #eeeeee;
`;

const RowHead = styled.th`
  background-color: #eeeeee;
  width: 36px;
`;

const Indicator = styled.div`
  padding: 0 40px;
  text-align: left;
`;

const List = styled.ul`
  display: ${(p: any) => p.flex && 'flex'};
  list-style-type: none;
  height: ${(p: any) => p.height};
`;

export {
  OverviewWrapper,
  Table,
  Row,
  HeadRow,
  Cell,
  Head,
  EmptyCell,
  RowHead,
  Indicator,
  List,
  TextTitle,
  TableWrapper,
};
