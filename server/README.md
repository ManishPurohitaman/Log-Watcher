edge cases : 

1. Too frequent writes : 
      program choked(maintain a queue on writer side | and reader side)
      send to client only when queue size > 1
2. If File has less than 10 lines. : 
    Handled : offset >= -1
