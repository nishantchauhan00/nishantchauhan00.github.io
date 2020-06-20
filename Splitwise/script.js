class BinaryHeap {
    constructor() {
        this.heap = [];
    }

    length() {
        return this.heap.length;
    }

    insert(val) {
        this.heap.push(val);
        this.bubbleUp();
    }

    empty() {
        return this.heap.length < 1;
    }

    bubbleUp() {
        let index = this.length() - 1;
        while (index > 0) {
            let element = this.heap[index],
                parentIndex = Math.floor((index - 1) / 2),
                parent = this.heap[parentIndex];
            if (parent[0] >= element[0]) break;
            this.heap[index] = parent;
            this.heap[parentIndex] = element;
            index = parentIndex;
        }
    }

    extractMax() {
        if (this.empty()) {
            return;
        }
        const max = this.heap[0];
        const tmp = this.heap.pop();
        if (!this.empty()) {
            this.heap[0] = tmp;
            this.sinkDown(0);
        }
        return max;
    }

    sinkDown(parent_index) {
        let child1 = 2 * parent_index + 1,
            child2 = 2 * parent_index + 2,
            largest = parent_index;
        const length = this.length();
        if (child1 < length && this.heap[child1][0] > this.heap[parent_index][0]) {
            largest = child1;
        } else if (child2 < length && this.heap[child2][0] > this.heap[parent_index][0]) {
            largest = child2;
        }

        if (largest !== parent_index) {
            const temp = this.heap[parent_index][0];
            this.heap[parent_index][0] = this.heap[largest][0];
            this.heap[largest][0] = temp;
            this.sinkDown(largest);
        }
    }
}

class SplitWise {
    constructor(nodes, edges) {
        this.nodes = nodes;
        this.edges = edges;
    }

    solve() {
        let size = this.nodes.length;
        let vals = Array(size).fill(0);
        for (let i = 0; i < this.edges.length; i++) {
            vals[this.edges[i].from - 1] -= this.edges[i].label * 1;
            vals[this.edges[i].to - 1] += this.edges[i].label * 1;
        }

        let negative_heap = new BinaryHeap();
        let positive_heap = new BinaryHeap();
        for (let i = 0; i < size; i++) {
            if (vals[i] < 0) {
                negative_heap.insert([vals[i] * (-1), i]);
                vals[i] *= -1;
            } else if (vals[i] > 0) {
                positive_heap.insert([vals[i] * 1, i]);
            }
        }

        let new_edges = [];
        while (!negative_heap.empty() && !positive_heap.empty()) {
            const neg = negative_heap.extractMax();
            const pos = positive_heap.extractMax();
            let from = neg[1],
                to = pos[1];
            let debit = neg[0],
                credit = pos[0];

            const settle_amount = Math.min(debit, credit);

            debit -= settle_amount;
            credit -= settle_amount;
            console.log(neg, from, pos, to, settle_amount, debit, credit);

            new_edges.push({
                from: from + 1,
                to: to + 1,
                label: `${settle_amount}`
            });

            // debit
            if (debit !== 0) {
                negative_heap.insert([debit, from]);
            }
            // credit
            else if (credit !== 0) {
                positive_heap.insert([credit, to]);
            }
        }

        return new_edges;
    }
}
const game_container = document.querySelector(".game_container");
const container = document.getElementById("game_box");
const from_inp = document.querySelector("#from_inp");
const to_inp = document.querySelector("#to_inp");
const amount_inp = document.querySelector("#amount");
const transactions_print = document.querySelector(".transactions");
container.setAttribute("style", `height:${game_container.clientHeight-20}px; width:${game_container.clientWidth-20}px;`)

// // test data
// var nodes = [{
//         id: 1,
//         label: "nishant"
//     },
//     {
//         id: 2,
//         label: "nisha"
//     },
//     {
//         id: 3,
//         label: "nishi"
//     },
//     {
//         id: 4,
//         label: "nishu"
//     }
// ];
// var edges = [{
//     from: 1,
//     to: 2,
//     label: "100"
// }, {
//     from: 3,
//     to: 1,
//     label: "40"
// }, {
//     from: 4,
//     to: 2,
//     label: "50"
// }, {
//     from: 2,
//     to: 3,
//     label: "60"
// }];

// // dev
var nodes = [];
var edges = [];

var options = {
    autoResize: true,
    height: '100%',
    width: '100%',
    locale: 'en',
    clickToUse: false,
    edges: {
        arrows: {
            to: true
        },
        labelHighlightBold: true,
        font: {
            size: 20
        }
    },
    nodes: {
        color: {
            border: '#000',
            background: '#222324',
            highlight: {
                border: '#161616',
                background: '#202020'
            },
            hover: {
                border: '#161616',
                background: '#202020'
            }
        },
        fixed: false,
        font: {
            color: '#fff',
            size: 16, // px
            face: 'arial'
        },
        shape: 'ellipse',
        shapeProperties: {
            borderDashes: false, // only for borders
            borderRadius: 10
        },
        scaling: {
            label: true
        },
        shadow: true
    }
};

const solve = (e) => {
    e.preventDefault();

    var splitwise_solver = new SplitWise(nodes, edges);
    var edges_new = splitwise_solver.solve();

    // console.log(edges_new, edges);

    var nodes_data = new vis.DataSet(nodes);
    var edges_data = new vis.DataSet(edges_new);
    var data = {
        nodes: nodes_data,
        edges: edges_data
    };
    var network = new vis.Network(container, data, options);
}

const submit = () => {
    let from = from_inp.value,
        to = to_inp.value,
        amt = amount_inp.value;
    let from_id = -1,
        to_id = -1;
    // input check
    if (amt.length < 1 || from.length < 1 || to.length < 1 || amt < 1 || from === to) {
        return;
    }

    // check if nodes exist
    for (let i = 1; i <= nodes.length; i++) {
        if (nodes[i - 1].label === from) {
            from_id = nodes[i - 1].id;
        } else if (nodes[i - 1].label === to) {
            to_id = nodes[i - 1].id;
        }
    }
    // if not exist then create
    if (from_id === -1) {
        from_id = nodes.length + 1;
        nodes.push({
            id: nodes.length + 1,
            label: from
        });
    }
    if (to_id === -1) {
        to_id = nodes.length + 1;
        nodes.push({
            id: nodes.length + 1,
            label: to
        });
    }

    // push transaction
    let data_edge_inp = {
        from: from_id,
        to: to_id,
        label: `${amt}`
    };
    edges.push(data_edge_inp);
    // console.log(data_edge_inp, nodes, edges);

    from_inp.value = "";
    to_inp.value = "";
    amount_inp.value = "";
    transactions_print.innerHTML += `<div class="transaction_single">
                                        > ${from} pays $${amt} to ${to}
                                    </div>`;
};

document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".submit_text").addEventListener("click", submit, true);
    document.querySelector(".solve_text").addEventListener("click", solve, true);
}, true);