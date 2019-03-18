import React from 'react';
import PropTypes from 'prop-types';
import { TableHead, TableSortLabel, Tooltip, TableRow, TableCell, Checkbox } from '@material-ui/core';

class EnhancedTableHead extends React.Component {
	createSortHandler = property => event => {
		this.props.onRequestSort(event, property);
	};

	render() {
		const { onSelectAllClick, order, orderBy, numSelected, rowCount, rows } = this.props;

		return (
			<TableHead>
				<TableRow>
					<TableCell padding='checkbox'>
						<Checkbox
							indeterminate={numSelected > 0 && numSelected < rowCount}
							checked={rowCount > 0 && numSelected === rowCount}
							onChange={onSelectAllClick}
						/>
					</TableCell>
					{rows.map(
						row => (
							<TableCell
								key={`head-item-${row.id}`}
								align={row.numeric ? 'right' : 'left'}
								padding={row.disablePadding ? 'none' : 'default'}
								sortDirection={orderBy === row.id ? order : false}
							>
								<Tooltip
									title='Sort'
									placement={row.numeric ? 'bottom-end' : 'bottom-start'}
									enterDelay={300}
								>
									<TableSortLabel
										active={orderBy === row.id}
										direction={order}
										onClick={this.createSortHandler(row.id)}
									>
										{row.label}
									</TableSortLabel>
								</Tooltip>
							</TableCell>
						),
						this,
					)}
				</TableRow>
			</TableHead>
		);
	}
}

EnhancedTableHead.propTypes = {
	onSelectAllClick: PropTypes.func,
	order: PropTypes.string,
	orderBy: PropTypes.string,
	numSelected: PropTypes.number,
	rowCount: PropTypes.number,
	rows: PropTypes.array,
  }

export default EnhancedTableHead;